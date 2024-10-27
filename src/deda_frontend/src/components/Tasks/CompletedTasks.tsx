import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function CompletedTasks() {
  return (
    <Card className="bg-black bg-opacity-50 border-none">
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>NLP Dataset - Completed on 2023-10-15</li>
          <li>Image Classification Data - Completed on 2023-10-10</li>
          <li>Time Series Analysis Set - Completed on 2023-10-05</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default CompletedTasks;
