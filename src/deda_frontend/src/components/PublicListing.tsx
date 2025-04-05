import { Search, Database } from "lucide-react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SquarePen, Send, Globe, Upload } from "lucide-react"
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
import { userState } from '../state/userState';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { UploadDialogBox } from "./UploadDialogBox"
import { getBackend } from '../lib/getBackend'
import { DataSubmission } from '../types'
import { useState, useEffect } from 'react'

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

interface Dataset {
  title: string
  description: string
  size: string
  tags: string[]
}

const datasets: Dataset[] = [
  {
    title: "Global Temperature Records",
    description: "Historical temperature data from weather stations worldwide",
    size: "2.3 GB",
    tags: ["climate"],
  },
  {
    title: "Public Transport Usage",
    description: "Monthly public transport usage statistics from major cities",
    size: "856 MB",
    tags: ["transportation"],
  },
]

export default function DatasetListing() {

  const user = useRecoilValue(userState);
  const [publicDataSubmission, setPublicDataSubmission] = useState<DataSubmission[]>([])
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

  const getPublicDataSubmissions = async () => {
    try {
      const submissions: DataSubmission[] = await backend.get_public_submissions() as DataSubmission[];
      setPublicDataSubmission(submissions)
      console.log("Public submissions: ", submissions)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPublicDataSubmissions();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar className='text-slate-900'>
        <SidebarContent className=' bg-gradient-to-b from-[#FFFBEB] to-[#fae9a3]'>
          <SidebarGroup>
            <SidebarGroupLabel className='text-slate-900'>DeDa</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem className={user.role === 'Researcher' && item.title === 'Submit Data' || user.role === 'User' && item.title === 'Request Data' ? 'hidden' : ''} key={item.title}>
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
      <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bottom-0 rounded-2xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
          </div>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
              <div className="py-16">
                <h1 className="font-display text-balance text-3xl/[0.9] font-medium tracking-tight text-slate-900 sm:text-4xl/[0.8] md:text-5xl/[0.8]">Dashboard</h1>
                <p className="mt-3 max-w-lg text-xl/7 font-medium text-slate-900/60 sm:text-2xl/8">
                  Hello, User
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bottom-0 rounded-2xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
          </div>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
              <div className="py-6 flex justify-between">
                <span>
                  <h3 className="font-semibold">Add Public Dataset</h3>
                  <p className="text-gray-600 text-sm">Add public datasets to the platform</p>
                </span>
                <UploadDialogBox requestId={BigInt(Date.now())} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input type="text" placeholder="Search datasets..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="climate">Climate</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {datasets.map((dataset) => (
            <Card key={dataset.title} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database />
                    <h3 className="font-semibold text-lg">{dataset.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{dataset.description}</p>
                  <div className="flex gap-2">
                    {dataset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-muted-foreground">{dataset.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
                <button className="ml-auto">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SidebarProvider>
  )
}

