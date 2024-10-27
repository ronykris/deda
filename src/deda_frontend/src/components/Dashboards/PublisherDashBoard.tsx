import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function PublisherDashboard() {
  return (
    <div className="space-y-4">
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Available Data Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <div className="flex justify-between">
                <span>Large Language Model Training Data</span>
                <span className="text-[#FAB13B]">50 ICP</span>
              </div>
              <Button
                size="sm"
                className="mt-2 bg-[#F05B24] hover:bg-[#28AAE2] transition-colors"
              >
                Submit Data
              </Button>
            </li>
            <li>
              <div className="flex justify-between">
                <span>Computer Vision Dataset</span>
                <span className="text-[#FAB13B]">30 ICP</span>
              </div>
              <Button
                size="sm"
                className="mt-2 bg-[#F05B24] hover:bg-[#28AAE2] transition-colors"
              >
                Submit Data
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Your Submitted Datasets</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Sentiment Analysis Corpus - Under Validation</li>
            <li>Time Series Data - Validated, Reward Pending</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublisherDashboard;
