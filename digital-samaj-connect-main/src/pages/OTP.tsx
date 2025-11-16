import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const phone = location.state?.phone || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Mock OTP verification (any 6 digits work)
      storage.setLoggedIn(phone);
      toast({
        title: "Login Successful",
        description: "Welcome to Digital Samaj!",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏘️</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Verify OTP</h1>
          <p className="text-muted-foreground">Enter the OTP sent to {phone}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="otp" className="text-base">Enter OTP</Label>
            <Input
              id="otp"
              type="tel"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="mt-2 h-12 text-lg text-center tracking-widest"
            />
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg">
            Verify & Continue
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => toast({ title: "OTP Resent", description: "A new OTP has been sent" })}
          >
            Resend OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
