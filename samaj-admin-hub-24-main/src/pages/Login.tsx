import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (mobile.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("tempMobile", mobile);
    navigate("/otp");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/20 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Digital Samaj</h1>
          <p className="text-muted-foreground">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-3xl shadow-lg p-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-card-foreground mb-6">
            Welcome Back
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-base">
                Mobile Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="pl-12 h-14 text-base rounded-2xl border-2 focus:border-primary transition-all"
                  maxLength={10}
                />
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full h-14 text-base rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              Next
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Enter your registered mobile number to continue
        </p>
      </div>
    </div>
  );
};

export default Login;
