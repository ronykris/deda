import { clearUser, retrieveUser } from "../lib/cacheFunctions";
import { userState } from "../state/userState";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";

export default function Header() {

    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = retrieveUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        clearUser(); // Clear user data from local storage
        setUser({ id: null, balance: 0, role: "User" }); // Reset user state
        navigate('/'); // Redirect to login page
    };

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
                        {/* <div className="relative flex group/item relative">
                        <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                        <a className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" href="/pricing">Pricing</a>
                    </div>
                    <div className="relative flex group/item relative">
                        <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                        <a className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" href="/company">Company</a>
                    </div>
                    <div className="relative flex group/item relative">
                        <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                        <a className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" href="/blog">Blog</a>
                    </div> */}
                        {user.id &&
                            <div className="relative flex group/item ">
                                <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                <Link className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" to="/dashboard">Dashboard</Link>
                            </div>
                        }
                        <div className="relative flex group/item ">
                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                            {user.id
                                ? <button className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" onClick={handleLogout}>Logout</button>
                                : <Link className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]" data-headlessui-state="" to="/login">Login</Link>
                            }
                        </div>
                    </nav>
                    {/* <button className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden" aria-label="Open main menu" id="headlessui-disclosure-button-:Rsm6fkq:" type="button" aria-expanded="false" data-headlessui-state="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-6"><path fill-rule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path>
                        </svg>
                    </button> */}
                </div>
            </div>
        </header>
    )
}