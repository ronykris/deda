import React from 'react';
import Header from './Header';

const LandingPage: React.FC = () => {
    return (
        <div className="overflow-hidden">
            <div className="relative">
                <div className="absolute inset-2 bottom-0 rounded-2xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
                </div>
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-7xl">
                        <Header />
                        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
                            <h1 className="font-display text-balance text-4xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-6xl/[0.8] md:text-7xl/[0.8]">Decentralized Data Application.</h1>
                            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                                Empowering Fair, Transparent, and Quality-Driven Data for AI and ML Innovation.
                            </p>
                            <div className="mt-12 flex flex-col gap-y-6 sm:gap-y-4 sm:flex-row">
                                <a className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-transparent bg-gray-950 shadow-md text-base font-medium text-white hover:bg-gray-800 disabled:opacity-40"
                                    href="/dashboard">Get started</a>    
                            </div>
                            <div className="mt-6 flex flex-col gap-y-6 sm:gap-y-4 sm:flex-row">
                            <div className="relative pb-16 text-center sm:pb-24">                            
                            <img src="/icp-badge.svg" className='w-48 m-auto mt-2'/>                
                            </div>                    
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
                    {/* <div className="overflow-hidden">
                        <div className="pb-24 px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                                <h2 className="max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">A snapshot of your entire sales pipeline.</h2>
                                <div className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem] relative aspect-[1216px/768px] [--radius:theme(borderRadius.xl)]">
                                    <div className="absolute -inset-[var(--padding)] rounded-[calc(var(--radius)+var(--padding))] shadow-sm ring-1 ring-black/5 [--padding:theme(spacing.2)]">
                                    </div>
                                    <img alt="" src="/screenshots/app.png" className="h-full rounded-[var(--radius)] shadow-2xl ring-1 ring-black/10" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-7xl">
                            <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Features</h2>
                            <h3 className="mt-2 max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">Empowering Data for AI and ML Innovation.</h3>
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                                <div className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        {/*<div className="h-80 bg-[url(/1.jpg)] bg-cover bg-no-repeat" />*/}
                                        <img src="/1.jpg" alt="Background Image" className="h-80 w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
                                    </div>
                                    <div className="relative p-10">
                                        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Data</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Streamlined Data Requests</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Researchers can request specific datasets for AI/ML projects, detailing data requirements and offering rewards to contributors.</p>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 lg:rounded-tr-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        <img src="/2.jpg" alt="Background Image" className="h-80 w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"></div>
                                    </div>
                                    <div className="relative p-10">
                                        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Publishing</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Data Publishing Made Easy</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Data holders can respond to requests by publishing data directly to the platform, ensuring accessibility and transparency.</p>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 lg:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        {/*<div className="h-80 bg-[url(/4.jpg)] bg-cover bg-no-repeat" />*/}
                                        <img src="/4.jpg" alt="Background Image" className="h-80 w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"></div>
                                    </div>
                                    <div className="relative p-10">
                                        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Trust</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Trusted Data Verification and Cleaning</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Validators ensure data quality and integrity through thorough checks and cleaning, making it ready for reliable use.</p>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        {/*<div className="h-80 bg-[url(/3.jpg)] bg-cover bg-no-repeat" />*/}
                                        <img src="/3.jpg" alt="Background Image" className="h-80 w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"></div>
                                    </div>
                                    <div className="relative p-10">
                                        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Incentives</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Fair and Transparent Incentives</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Smart contracts fairly reward both data publishers and validators for their valuable contributions, encouraging active participation.</p>
                                    </div>
                                </div>
                                {/* <div className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        <div aria-hidden="true" className="relative size-full">
                                            <div className="absolute inset-0 bg-[url(/map.png)] bg-[length:530px_430px] bg-[center_-75px] bg-no-repeat [mask-image:linear-gradient(to_bottom,black_50%,transparent)]">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative p-10">
                                        <h3 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Limitless</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Sell globally</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Radiant helps you sell in locations currently under international embargo.</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mx-2 mt-2 rounded-2xl bg-gray-900 py-32">
                    <div className="px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-7xl">
                            <h2 data-dark="true" className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Outreach</h2>
                            <h3 data-dark="true" className="mt-2 max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">Customer outreach has never been easier.</h3>
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                                <div data-dark="true" className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0">
                                        <div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat">
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"></div>
                                    </div>
                                    <div className="relative p-10">
                                        <h3 data-dark="true" className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Networking</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Sell at the speed of light</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Our RadiantAI chat assistants analyze the sentiment of your conversations in real time, ensuring you're always one step ahead.</p>
                                    </div>
                                </div>
                                <div data-dark="true" className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15"><div className="relative h-80 shrink-0"><div aria-hidden="true" className="relative h-full overflow-hidden"><div className="absolute inset-0 top-8 z-10 flex items-center justify-center"><div className="absolute inset-0 backdrop-blur-md" style={{ maskImage: "url('data:image/svg+xml,<svg width=&quot;96&quot; height=&quot;96&quot; viewBox=&quot;0 0 96 96&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><rect width=&quot;96&quot; height=&quot;96&quot; rx=&quot;12&quot; fill=&quot;black&quot;/></svg>')", maskPosition: 'center', maskRepeat: 'no-repeat' }}>
                                </div>
                                    <div className="relative flex size-24 items-center justify-center rounded-xl bg-gradient-to-t from-white/5 to-white/25 shadow outline outline-offset-[-5px] outline-white/5 ring-1 ring-inset ring-white/10"><svg viewBox="0 0 34 34" fill="none" className="h-9 fill-white"><path d="M19.598 18.5C18.7696 19.9349 16.9348 20.4265 15.4999 19.5981C14.065 18.7696 13.5734 16.9349 14.4018 15.5C15.2303 14.0651 17.065 13.5735 18.4999 14.4019C19.9348 15.2303 20.4264 17.0651 19.598 18.5Z"></path><path d="M23.232 10.2058C22.6797 11.1623 21.4565 11.4901 20.4999 10.9378C19.5433 10.3855 19.2156 9.16235 19.7679 8.20576C20.3201 7.24918 21.5433 6.92143 22.4999 7.47371C23.4565 8.026 23.7842 9.24918 23.232 10.2058Z"></path><path d="M19.7679 25.7944C19.2156 24.8378 19.5433 23.6146 20.4999 23.0623C21.4565 22.51 22.6797 22.8378 23.232 23.7944C23.7843 24.7509 23.4565 25.9741 22.4999 26.5264C21.5433 27.0787 20.3202 26.7509 19.7679 25.7944Z"></path><path d="M25.9999 19.0001C24.8953 19.0001 23.9999 18.1047 23.9999 17.0001C23.9999 15.8956 24.8953 15.0001 25.9999 15.0001C27.1045 15.0001 27.9999 15.8956 27.9999 17.0001C27.9999 18.1047 27.1045 19.0001 25.9999 19.0001Z"></path><path d="M14.232 25.7942C13.6797 26.7508 12.4565 27.0786 11.4999 26.5263C10.5433 25.974 10.2156 24.7508 10.7679 23.7942C11.3201 22.8376 12.5433 22.5099 13.4999 23.0622C14.4565 23.6145 14.7842 24.8376 14.232 25.7942Z"></path><path d="M10.7679 10.2059C10.2157 9.24936 10.5434 8.02618 11.5 7.4739C12.4566 6.92161 13.6798 7.24936 14.232 8.20595C14.7843 9.16253 14.4566 10.3857 13.5 10.938C12.5434 11.4903 11.3202 11.1625 10.7679 10.2059Z"></path><path d="M7.99999 19.0002C6.89542 19.0002 5.99999 18.1047 5.99999 17.0002C5.99999 15.8956 6.89542 15.0002 7.99999 15.0002C9.10456 15.0002 9.99999 15.8956 9.99999 17.0002C9.99999 18.1047 9.10456 19.0002 7.99999 19.0002Z"></path><path d="M25.8659 3.64359C25.5898 4.12188 24.9782 4.28575 24.4999 4.00961C24.0216 3.73347 23.8577 3.12188 24.1339 2.64359C24.41 2.16529 25.0216 2.00142 25.4999 2.27756C25.9782 2.5537 26.1421 3.16529 25.8659 3.64359Z"></path><path d="M33.0001 18.0002C32.4478 18.0002 32.0001 17.5524 32.0001 17.0002C32.0001 16.4479 32.4478 16.0002 33.0001 16.0002C33.5523 16.0002 34.0001 16.4479 34.0001 17.0002C34.0001 17.5524 33.5523 18.0002 33.0001 18.0002Z"></path><path d="M31.3561 9.86594C30.8778 10.1421 30.2663 9.97821 29.9901 9.49992C29.714 9.02162 29.8778 8.41003 30.3561 8.13389C30.8344 7.85775 31.446 8.02162 31.7222 8.49992C31.9983 8.97821 31.8344 9.5898 31.3561 9.86594Z"></path><path d="M30.3563 25.866C29.878 25.5899 29.7141 24.9783 29.9903 24.5C30.2664 24.0217 30.878 23.8578 31.3563 24.134C31.8346 24.4101 31.9985 25.0217 31.7223 25.5C31.4462 25.9783 30.8346 26.1422 30.3563 25.866Z"></path><path d="M16.0001 33.0001C16.0001 32.4478 16.4478 32.0001 17.0001 32.0001C17.5524 32.0001 18.0001 32.4478 18.0001 33.0001C18.0001 33.5524 17.5524 34.0001 17.0001 34.0001C16.4478 34.0001 16.0001 33.5524 16.0001 33.0001Z"></path><path d="M24.134 31.3566C23.8579 30.8783 24.0218 30.2667 24.5001 29.9905C24.9784 29.7144 25.59 29.8783 25.8661 30.3566C26.1422 30.8349 25.9784 31.4464 25.5001 31.7226C25.0218 31.9987 24.4102 31.8349 24.134 31.3566Z"></path><path d="M9.86593 31.3564C9.58978 31.8347 8.97819 31.9986 8.4999 31.7224C8.02161 31.4463 7.85773 30.8347 8.13388 30.3564C8.41002 29.8781 9.02161 29.7142 9.4999 29.9904C9.97819 30.2665 10.1421 30.8781 9.86593 31.3564Z"></path><path d="M1 18.0001C0.447715 18.0001 -3.44684e-08 17.5524 0 17.0001C3.44684e-08 16.4478 0.447715 16.0001 1 16.0001C1.55228 16.0001 2 16.4478 2 17.0001C2 17.5524 1.55228 18.0001 1 18.0001Z"></path><path d="M3.64329 25.866C3.16499 26.1422 2.5534 25.9783 2.27726 25.5C2.00112 25.0217 2.16499 24.4101 2.64329 24.134C3.12158 23.8578 3.73317 24.0217 4.00931 24.5C4.28545 24.9783 4.12158 25.5899 3.64329 25.866Z"></path><path d="M2.6435 9.86602C2.1652 9.58987 2.00133 8.97828 2.27747 8.49999C2.55361 8.0217 3.1652 7.85782 3.6435 8.13397C4.12179 8.41011 4.28566 9.0217 4.00952 9.49999C3.73338 9.97828 3.12179 10.1422 2.6435 9.86602Z"></path><path d="M16.0001 1C16.0001 0.447715 16.4478 -4.87226e-08 17.0001 0C17.5524 4.87226e-08 18.0001 0.447715 18.0001 1C18.0001 1.55228 17.5524 2 17.0001 2C16.4478 2 16.0001 1.55228 16.0001 1Z"></path><path d="M8.13398 3.64371C7.85783 3.16542 8.02171 2.55383 8.5 2.27768C8.97829 2.00154 9.58988 2.16542 9.86603 2.64371C10.1422 3.122 9.97829 3.73359 9.5 4.00973C9.02171 4.28588 8.41012 4.122 8.13398 3.64371Z"></path></svg></div>
                                </div>
                                    <div className="absolute inset-0 grid grid-cols-1 pt-8 [container-type:inline-size]">
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]">
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden">
                                            </div>
                                            <div className="[animation-delay:-26s] [animation-duration:30s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/loom.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Loom</span>
                                            </div>
                                            <div className="[animation-delay:-8s] [animation-duration:30s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/gmail.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Gmail</span>
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]">
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden">
                                            </div>
                                            <div className="[animation-delay:-40s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/asana.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Asana</span>
                                            </div>
                                            <div className="[animation-delay:-20s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/microsoft-teams.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Microsoft Teams</span>
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]">
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden">
                                            </div><div className="[animation-delay:-10s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/google-calendar.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Google Calendar</span>
                                            </div>
                                            <div className="[animation-delay:-32s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/google-drive.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Google Drive</span>
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]">
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden">
                                            </div>
                                            <div className="[animation-delay:-45s] [animation-duration:45s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/basecamp.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Basecamp</span>
                                            </div>
                                            <div className="[animation-delay:-23s] [animation-duration:45s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/discord.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Discord</span>
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]"></div>
                                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden"></div>
                                            <div className="[animation-delay:-55s] [animation-duration:60s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/hubspot.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Hubspot</span>
                                            </div>
                                            <div className="[animation-delay:-20s] [animation-duration:60s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/slack.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Slack</span>
                                            </div>
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]">
                                            </div><div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden"></div>
                                            <div className="[animation-delay:-9s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/adobe-creative-cloud.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Adobe Creative Cloud</span>
                                            </div>
                                            <div className="[animation-delay:-28s] [animation-duration:40s] absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-t from-gray-800 from-50% to-gray-700 ring-1 ring-inset ring-white/10 [--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]">
                                                <img alt="" src="/logo-timeline/zoom.svg" className="size-4" />
                                                <span className="text-sm/6 font-medium text-white">Zoom</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                    <div className="relative p-10"><h3 data-dark="true" className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Integrations</h3><p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Meet leads where they are</p><p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">With thousands of integrations, no one will be able to escape your cold outreach.</p>
                                    </div>
                                </div>
                                <div data-dark="true" className="lg:col-span-2 lg:rounded-bl-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15">
                                    <div className="relative h-80 shrink-0"><div aria-hidden="true" className="isolate mx-auto grid h-full grid-cols-1">
                                        <svg viewBox="0 0 500 500" fill="none" className="col-start-1 row-start-1 size-full [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,black_90%,transparent),radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]"><circle cx="250" cy="250" r="4" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="18" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="32" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="46" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="60" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="74" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="88" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="102" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="116" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="130" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="144" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="158" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="172" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="186" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="200" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="214" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="228" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="242" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="256" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="270" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="284" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="298" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="312" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle>
                                            <circle cx="250" cy="250" r="326" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="340" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="354" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="368" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="382" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="396" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="410" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="424" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="438" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="452" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="466" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="480" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="494" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="508" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="522" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="536" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="550" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="564" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle><circle cx="250" cy="250" r="578" className="stroke-white" stroke-opacity="0.15" style={{ transform: 'none', transformOrigin: '250px 250px' }}></circle></svg><div className="z-10 col-start-1 row-start-1"><div className="mx-auto flex size-full max-w-md items-center justify-around"><img alt="" src="/linked-avatars/customer.jpg" className="size-20 rounded-full bg-white/15 ring-4 ring-white/10" /><img alt="" src="/linked-avatars/manager.jpg" className="size-20 rounded-full bg-white/15 ring-4 ring-white/10" /></div>
                                        </div><div className="z-10 col-start-1 row-start-1 flex items-center justify-center"><div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-t from-green-500 to-green-300 shadow" style={{ transform: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="size-4 fill-white"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"></path></svg></div></div></div>
                                    </div>
                                    <div className="relative p-10"><h3 data-dark="true" className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Meetings</h3><p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Smart call scheduling</p><p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">Automatically insert intro calls into your leads' calendars without their consent.</p></div>
                                </div>
                                <div data-dark="true" className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 data-[dark]:bg-gray-800 data-[dark]:ring-white/15"><div className="relative h-80 shrink-0"><div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat">
                                </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]"></div>
                                </div>
                                    <div className="relative p-10">
                                        <h3 data-dark="true" className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Engagement</h3>
                                        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white">Become a thought leader</p>
                                        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400">RadiantAI automatically writes LinkedIn posts that relate current events to B2B sales, helping you build a reputation as a thought leader.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
            <footer>
                <div className="relative bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]"><div className="absolute inset-2 rounded-2xl bg-white/80">
                </div>
                    <div className="px-6 lg:px-8"><div className="mx-auto max-w-2xl lg:max-w-7xl">
                        <div className="relative pt-20 text-center pb-5 sm:pt-24">
                            <hgroup>
                                <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Get started</h2>
                                <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">Ready to dive in?<br />Start your journey today.</p>
                            </hgroup>
                            <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">Empower Data Collaboration and Maximize Value with Deda.</p>
                            <div className="mt-6">
                                <a className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40" data-headlessui-state="" href="/dashboard">Get started</a>
                            </div>
                        </div>
                        <div className="relative pb-16 text-center sm:pb-24">
                            <hgroup>
                                <h2 className="font-mono text-xl font-semibold uppercase tracking-widest text-gray-800 data-[dark]:text-gray-400">Powered by</h2>
                            </hgroup>
                            <img src="/icp-logo.png" className='w-48 m-auto mt-2'/>
                        </div>
                        <div className="pb-16">
                            <div className="group/row relative isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]">
                                <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2">
                                    <div className="absolute inset-x-0 top-0 border-t border-black/5">
                                    </div>
                                    <div className="absolute inset-x-0 top-2 border-t border-black/5"></div>
                                    <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"></div>
                                    <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                                    <div className="col-span-2 flex">
                                        <div className="pt-6 lg:pb-6 group/item relative">
                                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                            <svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                            <svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                            <p className='text-2xl font-bold'>DeDa</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                                        <div>
                                            <h3 className="text-sm/6 font-medium text-gray-950/50">Product</h3><ul className="mt-6 space-y-4 text-sm/6">
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="/pricing">Pricing</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Analysis</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">API</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm/6 font-medium text-gray-950/50">Company</h3>
                                            <ul className="mt-6 space-y-4 text-sm/6">
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Careers</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="/blog">Blog</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="/company">Company</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm/6 font-medium text-gray-950/50">Support</h3>
                                            <ul className="mt-6 space-y-4 text-sm/6">
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Help center</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Community</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm/6 font-medium text-gray-950/50">Company</h3>
                                            <ul className="mt-6 space-y-4 text-sm/6">
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Terms of service</a></li>
                                                <li><a className="font-medium text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="#">Privacy policy</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between group/row relative isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]"><div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2">
                                <div className="absolute inset-x-0 top-0 border-t border-black/5"></div>
                                <div className="absolute inset-x-0 top-2 border-t border-black/5"></div>
                                <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"></div>
                                <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"></div>
                            </div>
                                <div>
                                    <div className="py-3 group/item relative"><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                        <div className="text-sm/6 text-gray-950">© 2024 Deda Inc.</div>
                                    </div>
                                </div>
                                <div className="flex"><div className="flex items-center gap-8 py-3 group/item relative"><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-first/item:block absolute size-[15px] fill-black/10 -top-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="absolute size-[15px] fill-black/10 -top-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:group-first/item:block absolute size-[15px] fill-black/10 -bottom-2 -left-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg><svg viewBox="0 0 15 15" aria-hidden="true" className="hidden group-last/row:block absolute size-[15px] fill-black/10 -bottom-2 -right-2"><path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path></svg>
                                    <a target="_blank" aria-label="Visit us on Facebook" className="text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="https://facebook.com"><svg viewBox="0 0 16 16" fill="currentColor" className="size-4"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"></path></svg></a>
                                    <a target="_blank" aria-label="Visit us on X" className="text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="https://x.com"><svg viewBox="0 0 16 16" fill="currentColor" className="size-4"><path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z"></path></svg></a>
                                    <a target="_blank" aria-label="Visit us on LinkedIn" className="text-gray-950 data-[hover]:text-gray-950/75" data-headlessui-state="" href="https://linkedin.com">
                                        <svg viewBox="0 0 16 16" fill="currentColor" className="size-4"><path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z"></path></svg></a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;