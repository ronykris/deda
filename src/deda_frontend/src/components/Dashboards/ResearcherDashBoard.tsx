import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function ResearcherDashboard() {
  return (
    <div className="space-y-4">
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Request New Dataset</CardTitle>
          <CardDescription>
            Specify your data requirements and set a reward
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 bg-grey">
            <Input
              placeholder="Dataset Title"
              className="bg-grey bg-opacity-10 border-none"
            />
            <Input
              placeholder="Description"
              className="bg-grey bg-opacity-10 border-none"
            />
            <Input
              placeholder="Reward Amount (ICP)"
              type="number"
              className="bg-grey bg-opacity-10 border-none"
            />
            <Button className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors">
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Your Active Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Machine Learning Dataset - Pending Validation</li>
            <li>NLP Corpus - Data Submitted</li>
            <li>Image Recognition Set - Awaiting Data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResearcherDashboard;
