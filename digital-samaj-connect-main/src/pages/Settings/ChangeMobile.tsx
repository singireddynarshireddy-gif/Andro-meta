import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const ChangeMobile = () => {
  const [phone, setPhone] = useState(storage.getPhone() || '');
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      storage.setLoggedIn(phone);
      toast({ title: "Mobile Number Updated", description: "Your mobile number has been updated successfully" });
    } else {
      toast({ variant: "destructive", title: "Invalid Number", description: "Please enter a valid 10-digit mobile number" });
    }
  };

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Change Mobile Number</h1>
        
        <form onSubmit={handleSave}>
          <Card className="p-6">
            <div className="mb-4">
              <Label htmlFor="phone">New Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full">Save Changes</Button>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
};

export default ChangeMobile;
