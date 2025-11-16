import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      navigate('/otp', { state: { phone } });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏘️</div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Digital Samaj</h1>
          <p className="text-muted-foreground">Welcome! Please login to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="phone" className="text-base">Mobile Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="mt-2 h-12 text-lg"
            />
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
