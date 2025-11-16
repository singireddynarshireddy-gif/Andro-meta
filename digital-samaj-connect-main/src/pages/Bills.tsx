import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Bills = () => {
  const [bills, setBills] = useState<any>({ dues: [], paid: [] });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setBills(storage.getBills());
  }, []);

  const totalDue = bills.dues.reduce((sum: number, bill: any) => sum + bill.amount, 0);

  const handlePayBill = (bill: any) => {
    const updatedBills = {
      dues: bills.dues.filter((b: any) => b.id !== bill.id),
      paid: [...bills.paid, { ...bill, paidDate: new Date().toISOString() }]
    };
    setBills(updatedBills);
    storage.saveBills(updatedBills);
    storage.addNotification(`Payment of ₹${bill.amount} successful for ${bill.name}`);
    toast({
      title: "Payment Successful",
      description: `Paid ₹${bill.amount} for ${bill.name}`,
    });
  };

  const handleViewReceipt = (bill: any) => {
    navigate('/receipt', { state: { bill } });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Bills</h1>

        <Tabs defaultValue="dues" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="dues">Dues</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="dues" className="space-y-4">
            <Card className="p-6 bg-destructive/10 border-destructive/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                  <p className="text-4xl font-bold text-destructive">₹{totalDue}</p>
                </div>
                <Button
                  size="lg"
                  onClick={() => toast({ title: "Payment", description: "Redirecting to payment gateway..." })}
                  disabled={totalDue === 0}
                >
                  Pay Now
                </Button>
              </div>
            </Card>

            {bills.dues.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No pending bills</p>
              </Card>
            ) : (
              bills.dues.map((bill: any) => (
                <Card key={bill.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{bill.name}</h3>
                      <p className="text-muted-foreground text-sm">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                      <p className="text-2xl font-bold mt-2">₹{bill.amount}</p>
                    </div>
                    <Button onClick={() => handlePayBill(bill)}>Pay Now</Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="paid" className="space-y-4">
            {bills.paid.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No payment history</p>
              </Card>
            ) : (
              bills.paid.map((bill: any) => (
                <Card key={bill.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{bill.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Paid: {new Date(bill.paidDate).toLocaleDateString()}
                      </p>
                      <p className="text-2xl font-bold mt-2 text-success">₹{bill.amount}</p>
                    </div>
                    <Button variant="outline" onClick={() => handleViewReceipt(bill)}>
                      Receipt
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Bills;
