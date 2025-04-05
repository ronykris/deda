import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import VerifyData from './VerifyData';
import StoreCleanedData from './StoreCleanedData';
import { userState } from '../state/userState';
import SubmitDataNew from './SubmitData';
import Header from './Header';
import AddDataRequest from './AddDataRequest';
import { useNavigate } from 'react-router-dom';
import DatasetListing from './PublicListing';
import { SquarePen, Send, Globe } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "./ui/sidebar"

const items = [
    {
        title: "Public Dataset",
        url: "/dashboard/public",
        icon: Globe,
    },
    {
        title: "Request Data",
        url: "/dashboard",
        icon: SquarePen,
    },
    {
        title: "Submit Data",
        url: "/dashboard",
        icon: Send,
    },
]

const Dashboard: React.FC = () => {

    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user.id) {
    //         navigate('/login');
    //     }
    // }, [user, navigate]);

    return (
        <SidebarProvider>
            <Sidebar className='text-slate-900'>
                <SidebarContent className=' bg-gradient-to-b from-[#FFFBEB] to-[#fae9a3]'>
                    <SidebarGroup>
                        <SidebarGroupLabel className='text-slate-900'>DeDa</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem className={user.role === 'Researcher' && item.title === 'Submit Data' ||user.role === 'User' && item.title === 'Request Data' ? 'hidden' : ''} key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <main className='bg-[#F8F9FA] min-h-screen w-full overflow-hidden'>
                {/* <SidebarTrigger /> */}
                <div className="relative">
                    <div className="absolute inset-2 bottom-0 rounded-2xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
                    </div>
                    <div className="relative px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-7xl">
                            <Header />
                            <div className="py-16">
                                <h1 className="font-display text-balance text-3xl/[0.9] font-medium tracking-tight text-slate-900 sm:text-4xl/[0.8] md:text-5xl/[0.8]">Dashboard</h1>
                                <p className="mt-3 max-w-lg text-xl/7 font-medium text-slate-900/60 sm:text-2xl/8">
                                    Hello, {user.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative mx-auto max-w-2xl lg:max-w-7xl '>
                    <div className='relative px-6 lg:px-8 max-w-2xl lg:max-w-7xl z-10'>
                        {user.role === 'Researcher' && <AddDataRequest />}
                        {user.role === 'User' && <SubmitDataNew />}
                        {user.role === 'Validator' && (
                            <>
                                <VerifyData />
                                <StoreCleanedData />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Dashboard;