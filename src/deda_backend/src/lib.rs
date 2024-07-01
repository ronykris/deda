use candid::{CandidType, Deserialize, Principal};
use ic_cdk::caller;
use std::collections::HashMap;
use ic_cdk::{query, update};

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

#[update]
fn login(role: String) -> Result<Principal, String> {
    ic_cdk::println!("Received role: {:?}", role);
    if role != "User" && role != "Validator" && role != "Researcher" {
        return Err("Invalid role".to_string());
    }
    let caller = caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if !state.users.contains_key(&caller) {
            state.users.insert(caller, User {
                id: caller,
                balance: 0,
                role: role.clone(),
            });
        } else {
            let user = state.users.get_mut(&caller).unwrap();
            user.role = role;
        }
    });
    Ok(caller)
}

#[query]
fn get_data_requests() -> Vec<DataRequest> {
    STATE.with(|state| state.borrow().data_requests.clone())
}

#[update]
fn add_data_request(description: String, reward: u64) -> u64 {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let request_id = state.next_request_id;
        state.next_request_id += 1;
        state.data_requests.push(DataRequest {
            id: request_id,
            description,
            reward,
        });
        request_id
    })
}

#[update]
fn submit_data(request_id: u64, location: String) -> Result<u64, String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.data_requests.iter().any(|r| r.id == request_id) {
            let submission_id = state.next_submission_id;
            state.next_submission_id += 1;
            state.data_submissions.push(DataSubmission {
                id: submission_id,
                request_id,
                provider: caller,
                location,
                verified: false,
                verifier: None,
            });
            Ok(submission_id)
        } else {
            Err("Request ID not found".to_string())
        }
    })
}

#[update]
fn verify_data(submission_id: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(submission) = state.data_submissions.iter_mut().find(|s| s.id == submission_id) {
            if submission.verified {
                return Err("Data already verified".to_string());
            }
            submission.verified = true;
            submission.verifier = Some(caller);
            Ok(())
        } else {
            Err("Submission ID not found".to_string())
        }
    })
}

#[update]
fn pay_contributors(submission_id: u64) -> Result<(), String> {
    let (provider_principal, verifier_principal, reward) = STATE.with(|state| {
        let state = state.borrow();
        
        if let Some(submission) = state.data_submissions.iter().find(|s| s.id == submission_id && s.verified) {
            if let Some(request) = state.data_requests.iter().find(|r| r.id == submission.request_id) {
                let provider_reward = request.reward / 2;
                let verifier_reward = request.reward / 2;
                Ok((submission.provider, submission.verifier, (provider_reward, verifier_reward)))
            } else {
                Err("Request not found".to_string())
            }
        } else {
            Err("Submission not found or not verified".to_string())
        }
    })?;
    
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if let Some(provider) = state.users.get_mut(&provider_principal) {
            provider.balance += reward.0;
        } else {
            return Err("Provider not found".to_string());
        }

        if let Some(Some(verifier)) = verifier_principal.map(|vp| state.users.get_mut(&vp)) {
            verifier.balance += reward.1;
        } else if verifier_principal.is_some() {
            return Err("Verifier not found".to_string());
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
fn get_balance(user: Principal) -> u64 {
    STATE.with(|state| {
        state.borrow().users.get(&user).map_or(0, |u| u.balance)
    })
}
