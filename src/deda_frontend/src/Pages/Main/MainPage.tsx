import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Home,
  Search,
  Settings,
  User,
  Database,
  FileCheck,
  DollarSign,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CompletedTasks from "../../components/Tasks/CompletedTasks";
import ResearcherDashboard from "../../components/Dashboards/ResearcherDashBoard";
import PublisherDashboard from "../../components/Dashboards/PublisherDashBoard";
import ValidatorDashboard from "../../components/Dashboards/ValidatorDashBoard";

export default function MainPage() {
  const [activeRole, setActiveRole] = useState("researcher");

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#28AAE2] via-[#FAB13B] to-[#682683] text-white">
      {/* Left Sidebar */}
      <div className="w-48 bg-black bg-opacity-50 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">DEDA</div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <Database className="mr-2 h-4 w-4" />
            Datasets
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Validation
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Rewards
          </Button>
        </nav>
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-[#28AAE2] hover:text-white transition-colors"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black bg-opacity-50">
        {/* Top Bar */}
        <div className="bg-black bg-opacity-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveRole("researcher")}
              className="hover:bg-[#28AAE2] hover:text-white transition-colors"
            >
              Researcher
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveRole("publisher")}
              className="hover:bg-[#28AAE2] hover:text-white transition-colors"
            >
              Publisher
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveRole("validator")}
              className="hover:bg-[#28AAE2] hover:text-white transition-colors"
            >
              Validator
            </Button>
            <Search className="h-5 w-5" />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5" />
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1 p-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-black bg-opacity-50">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-[#28AAE2]"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#28AAE2]"
              >
                Completed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              {activeRole === "researcher" && <ResearcherDashboard />}
              {activeRole === "publisher" && <PublisherDashboard />}
              {activeRole === "validator" && <ValidatorDashboard />}
            </TabsContent>
            <TabsContent value="completed">
              <CompletedTasks />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-black bg-opacity-50 p-4">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Datasets</span>
            <span className="text-[#FAB13B]">1,234</span>
          </div>
          <div className="flex justify-between">
            <span>Active Requests</span>
            <span className="text-[#F05B24]">56</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Validations</span>
            <span className="text-[#EC1F79]">23</span>
          </div>
        </div>
        <Separator className="my-4 bg-white bg-opacity-20" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-match Requests</span>
            <Switch />
          </div>
        </div>
        <Separator className="my-4 bg-white bg-opacity-20" />
        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
        <div className="space-y-2 text-sm">
          <p>New dataset submitted for NLP task</p>
          <p>Validation completed for Image Classification data</p>
          <p>Reward distributed for Sentiment Analysis contribution</p>
        </div>
      </div>
    </div>
  );
}
