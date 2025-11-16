import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bill = location.state?.bill;

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p>No receipt data available</p>
          <Button onClick={() => navigate('/bills')} className="mt-4">Go to Bills</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card className="max-w-md mx-auto p-8">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Receipt</h1>
          <p className="text-muted-foreground">Transaction Successful</p>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bill Name</span>
            <span className="font-semibold">{bill.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-semibold text-success">₹{bill.amount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-semibold">
              {new Date(bill.paidDate).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-semibold">
              {new Date(bill.paidDate).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-sm">{bill.id}-{Date.now()}</span>
          </div>
        </div>

        <Button className="w-full mt-6" onClick={() => navigate('/bills')}>
          Done
        </Button>
      </Card>
    </div>
  );
};

export default Receipt;
