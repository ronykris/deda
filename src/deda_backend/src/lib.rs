use candid::{CandidType, Deserialize, Principal};
use std::{collections::HashMap, ops::Range};
use ic_cdk::{query, update};
use ic_stable_structures::{ memory_manager::{MemoryId, MemoryManager, VirtualMemory}, storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable };
use std::cell::RefCell;
use std::borrow::Cow;

#[derive(CandidType, Deserialize)]
struct User {
    id: Principal,
    balance: u64,
    role: String,
}

#[derive(CandidType, Deserialize, Clone)]
struct DataRequest {
    id: u64,
    description: String,
    reward: u64,
    creator: Principal,
}

#[derive(CandidType, Deserialize, Clone)]
struct DataSubmission {
    id: u64,
    request_id: u64,
    provider: Principal,
    location: String,
    verified: bool,
    verifier: Option<Principal>,
}

#[derive(CandidType, Deserialize, Clone)]
struct CleanedData {
    request_id: u64,
    location: String,
    validator: Principal,
}

#[derive(CandidType, Deserialize)]
struct State {
    users: HashMap<Principal, User>,
    data_requests: Vec<DataRequest>,
    data_submissions: Vec<DataSubmission>,
    cleaned_data: HashMap<u64, CleanedData>,
    next_request_id: u64,
    next_submission_id: u64,
}

#[derive(Debug, Clone)]
struct SubmissionData(Vec<String>);

thread_local! {
    static STATE: std::cell::RefCell<State> = std::cell::RefCell::new(State {
        users: HashMap::new(),
        data_requests: Vec::new(),
        data_submissions: Vec::new(),
        cleaned_data: HashMap::new(),
        next_request_id: 0,
        next_submission_id: 0,
    });
}

impl Storable for SubmissionData {
    fn to_bytes(&self) -> Cow<[u8]> {
        let serialized: Vec<u8> = self.0.iter()
            .flat_map(|s| {
                let mut bytes = s.as_bytes().to_vec();
                bytes.push(0); // Add a null byte as a separator
                bytes
            })
            .collect();
        Cow::Owned(serialized)
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        let bytes = bytes.into_owned();
        let strings = bytes.split(|&b| b == 0) // Split on null bytes
            .filter(|slice| !slice.is_empty())
            .map(|slice| String::from_utf8(slice.to_vec()).expect("Invalid UTF-8"))
            .collect();
        SubmissionData(strings)
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: 1000000000,
        is_fixed_size: false,
    };    
}

fn get_page_range() -> Range<u64> {
    0..1000 // Adjust based on application needs
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    /*static CSV_STORAGE: RefCell<StableVec<CsvLine, RestrictedMemory<Rc<RefCell<Vec<u8>>>>>> = RefCell::new(
        {   
            let memory = Rc::new(RefCell::new(Vec::new()));
            let page_range: Range<u64> = get_page_range(); 
            let restricted_memory = RestrictedMemory::new(memory, page_range);
            
            StableVec::init(restricted_memory).expect("Failed to initialize StableVec")
        }
    );*/
    static SUBMISSION_DATA: RefCell<StableBTreeMap<u64, SubmissionData, VirtualMemory<DefaultMemoryImpl>>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|manager| {
                manager.borrow().get(MemoryId::new(0)) // MemoryId 0 for submission data
            }),
        )
    );
}

#[update]
fn login(principal: Principal, role: String) -> Result<Principal, String> {
    ic_cdk::println!("Received principal: {:?} with role: {:?}", principal, role);
    
    if role != "User" && role != "Validator" && role != "Researcher" {
        return Err("Invalid role".to_string());
    }
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if !state.users.contains_key(&principal) {
            ic_cdk::println!("Inserting new user with principal: {:?}", principal);
            state.users.insert(principal, User {
                id: principal,
                balance: 0,
                role: role.clone(),
            });
        } else {
            let user = state.users.get_mut(&principal).unwrap();
            user.role = role;
            ic_cdk::println!("Updating existing user with principal: {:?}", principal);
        }
    });
    
    Ok(principal)
}

#[query]
fn get_data_requests() -> Vec<DataRequest> {
    STATE.with(|state| state.borrow().data_requests.clone())
}

#[query]
fn get_my_data_requests() -> Vec<DataRequest> {
    let caller = ic_cdk::caller();

    STATE.with(|state| {
        let state = state.borrow();

        state
            .data_requests
            .iter()
            .filter(|request| request.creator == caller)
            .cloned()
            .collect()
    })
}

#[update]
fn add_data_request(description: String, reward: u64) -> u64 {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let request_id = state.next_request_id;
        state.next_request_id += 1;
        state.data_requests.push(DataRequest {
            id: request_id,
            description,
            reward,
            creator: caller
        });
        request_id
    })
}

#[update]
fn submit_data(principal: Principal, request_id: u64, data: Vec<String>) -> Result<u64, String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.data_requests.iter().any(|r| r.id == request_id) {
            let submission_id = state.next_submission_id;
            state.next_submission_id += 1;
            state.data_submissions.push(DataSubmission {
                id: submission_id,
                request_id,
                provider: principal,
                location: format!("Submission ID: {}", submission_id),
                verified: false,
                verifier: None,
            });

            let submission_data = SubmissionData(data.clone());
            let size = submission_data.to_bytes().len();
            //if size > 10_000 { // Adjust limit based on memory range
            //    return Err(format!("Data size exceeds limit: {} bytes", size));
            //}

            SUBMISSION_DATA.with(|storage| -> Result<(), String> {
                let mut storage = storage.borrow_mut();
                ic_cdk::println!("Inserting submission data with ID: {}", submission_id);

                match storage.insert(submission_id, submission_data) {
                    Some(existing_data) => {
                        ic_cdk::println!("Overwriting existing data: {:?}", existing_data);
                        Ok(()) // Return success when overwriting
                    }
                    None => {
                        ic_cdk::println!("Inserted new submission data");
                        Ok(()) // Return success when inserting new data
                    }
                }
            })?;

            ic_cdk::println!(
                "Data submitted by {:?} for request_id: {} with submission_id: {}",
                principal,
                request_id,
                submission_id
            );
            Ok(submission_id)
            
        } else {
            Err("Request ID not found".to_string())
        }
    })
}

#[query]
fn get_my_submissions() -> Vec<DataSubmission> {
    let caller = ic_cdk::caller();

    STATE.with(|state| {
        let state = state.borrow();

        state
            .data_submissions
            .iter()
            .filter(|submission| submission.provider == caller)
            .cloned()
            .collect()
    })
}


#[update]
fn verify_data(principal: Principal, submission_id: u64) -> Result<(), String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(submission) = state.data_submissions.iter_mut().find(|s| s.id == submission_id) {
            if submission.verified {
                return Err("Data already verified".to_string());
            }
            submission.verified = true;
            submission.verifier = Some(principal);
            Ok(())
        } else {
            Err("Submission ID not found".to_string())
        }
    })
}

#[update]
fn pay_contributors(submission_id: u64) -> Result<(), String> {
    let (provider_principal, verifier_principal, provider_reward, verifier_reward) = STATE.with(|state| {
        let state = state.borrow();
        
        if let Some(submission) = state.data_submissions.iter().find(|s| s.id == submission_id && s.verified) {
            if let Some(request) = state.data_requests.iter().find(|r| r.id == submission.request_id) {
                let provider_reward = request.reward / 2;
                let verifier_reward = request.reward / 2;
                Ok((submission.provider, submission.verifier, provider_reward, verifier_reward))
            } else {
                Err("Request not found".to_string())
            }
        } else {
            Err("Submission not found or not verified".to_string())
        }
    })?;
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();

        ic_cdk::println!("Provider Principal: {:?}", provider_principal);
        ic_cdk::println!("Verifier Principal: {:?}", verifier_principal);
        ic_cdk::println!("Provider Reward: {:?}", provider_reward);
        ic_cdk::println!("Verifier Reward: {:?}", verifier_reward);
        
        if let Some(provider) = state.users.get_mut(&provider_principal) {
            provider.balance += provider_reward;
            ic_cdk::println!("Provider new balance: {:?}", provider.balance);
        } else {
            return Err("Provider not found".to_string());
        }

        if let Some(verifier_principal) = verifier_principal {
            if let Some(verifier) = state.users.get_mut(&verifier_principal) {
                verifier.balance += verifier_reward;
                ic_cdk::println!("Verifier new balance: {:?}", verifier.balance);
            } else {
                return Err("Verifier not found".to_string());
            }
        }

        Ok(())
    })
}

#[update]
fn store_cleaned_data(request_id: u64, location: String) {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.cleaned_data.insert(request_id, CleanedData {
            request_id,
            location,
            validator: caller,
        });
    });
}


#[query]
fn get_cleaned_data(request_id: u64) -> Option<CleanedData> {
    STATE.with(|state| {
        state.borrow().cleaned_data.get(&request_id).cloned()
    })
}

#[query]
fn get_data(submission_id: u64) -> Result<Vec<String>, String> {
    let caller = ic_cdk::caller();

    STATE.with(|state| {
        let state = state.borrow();

        if let Some(submission) = state.data_submissions.iter().find(|s| s.id == submission_id) {
            if submission.provider == caller || state.users.get(&caller).map(|u| &u.role) == Some(&"Researcher".to_string()) {
                
                return SUBMISSION_DATA.with(|storage| {
                    let storage = storage.borrow();
                    match storage.get(&submission_id) {
                        Some(data) => Ok(data.0.clone()),
                        None => Err("No data found for submission ID".to_string()),
                    }
                });
            } else {
                ic_cdk::println!("Access denied for caller: {:?}", caller);
                return Err("Access denied".to_string());
            }
        } else {
            Err("Submission ID not found".to_string())
        }
    })
}



#[query]
fn get_balance(user: Principal) -> u64 {
    ic_cdk::println!("Getting balance for principal: {:?}", user);
    let balance = STATE.with(|state| {
        state.borrow().users.get(&user).map_or(0, |u| u.balance)
    });
    ic_cdk::println!("Retrieved balance: {:?}", balance);
    balance
}
