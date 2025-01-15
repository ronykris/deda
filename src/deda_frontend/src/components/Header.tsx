import { clearUser, retrieveUser } from "../lib/cacheFunctions";
import { userState } from "../state/userState";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Principal } from "@dfinity/principal";
import { getBackend } from '../lib/getBackend'

interface DataSubmission {
    id: string;
    request_id: string;
    location: string;
    provider: Principal;
    verifier?: Principal;
    verified: boolean;
}

interface DataRequest {
    id: string;
    description: string;
    reward: number;
    creator: Principal;
}

export default function Header() {

    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const [allDataRequests, setAllDataRequests] = useState<DataRequest[]>([]);
    const [allDataSubmission, setAllDataSubmission] = useState<DataSubmission[]>([])
    const [backend, setBackend] = useState<any>(null);

    useEffect(() => {
        const fetchBackend = async () => {
            try {
                const backend = await getBackend();
                setBackend(backend);
                console.log('Backend: ', backend)
            } catch (error) {
                console.error('Error fetching backend:', error);
            }
        };    
        fetchBackend();
    }, []);

    useEffect(() => {
        const userData = retrieveUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        getDataRequests();
        getDataSubmissions();
    }, []);

    const handleLogout = () => {
        clearUser(); // Clear user data from local storage
        setUser({ id: null, balance: 0, role: "User" }); // Reset user state
        navigate('/'); // Redirect to login page
    };

    const getDataRequests = async () => {
        try {
            const dataRequests = await backend.get_data_requests();
            setAllDataRequests(dataRequests as DataRequest[]);
            console.log(dataRequests);
        } catch (error) {
            console.error(error);
        }
    }

    const getDataSubmissions = async () => {
        try {
            const submissions: DataSubmission[] = await backend.get_submissions() as DataSubmission[];
            setAllDataSubmission(submissions)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <header className="pt-6 sm:pt-8" data-headlessui-state="">
            <div className="">
                <div className="relative flex justify-between group/row isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]">
                    <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-[98vw] -translate-x-1/2">
                        <div className="absolute inset-x-0 top-0 border-t border-black/5"></div>
                        <div className="absolute inset-x-0 top-2 border-t border-black/5"></div>
                        <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"></div>
                        <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"></div>
                    </div>
                    <div className="relative flex gap-6">
                        <div className="py-3 group/item relative">
                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2">
                                <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                            <svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                            <Link title="Home" className='text-2xl font-bold' data-headlessui-state="" to="/">
                                DeDa
                            </Link>
                        </div>
                    </div>
                    <nav className="relative flex">
                        {user.id &&
                            <div className="relative flex group/item ">
                                <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                <Link className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" to="/dashboard">Dashboard</Link>
                            </div>
                        }
                        <div className="relative flex group/item ">
                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                            {user.id
                                ? <div>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`} alt="@shadcn" />
                                                <AvatarFallback>DD</AvatarFallback>
                                            </Avatar>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-60 p-2">
                                            <div className="flex flex-col px-4">
                                                <div className="px-2">
                                                    <p className="text-lg text-black font-bold">{allDataRequests.length}</p>
                                                    <dfn>Total Data Requests</dfn>
                                                </div>
                                                <div className="px-2">
                                                    <p className="text-lg text-black font-bold">{allDataRequests.length - allDataSubmission.length}</p>
                                                    <dfn>Unfulfilled Data Requests</dfn>
                                                </div>
                                                <button className="flex items-center px-2 py-3 w-full rounded text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/10" data-headlessui-state="" onClick={handleLogout}>Logout</button>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                                : <Link className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" to="/login">Login</Link>
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}