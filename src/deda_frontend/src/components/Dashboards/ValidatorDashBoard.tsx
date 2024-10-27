import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function ValidatorDashboard() {
  return (
    <div className="space-y-4">
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Datasets Pending Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <div>Machine Learning Dataset</div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#28AAE2] hover:text-white transition-colors"
                >
                  Review
                </Button>
                <Button
                  size="sm"
                  className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors"
                >
                  Validate
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="hover:bg-[#28AAE2] transition-colors"
                >
                  Reject
                </Button>
              </div>
            </li>
            <li>
              <div>NLP Corpus</div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-[#28AAE2] hover:text-white transition-colors"
                >
                  Review
                </Button>
                <Button
                  size="sm"
                  className="bg-[#F05B24] hover:bg-[#28AAE2] transition-colors"
                >
                  Validate
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="hover:bg-[#28AAE2] transition-colors"
                >
                  Reject
                </Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white bg-opacity-50 border-none">
        <CardHeader>
          <CardTitle>Your Validation History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Image Recognition Set - Validated</li>
            <li>Time Series Data - Validated</li>
            <li>Sentiment Analysis Corpus - Rejected (Low Quality)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ValidatorDashboard;
