import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  onSuccess: () => void;
}

const OTPVerification = ({ onSuccess }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const mobile = localStorage.getItem("tempMobile");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-forward to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields filled
    if (index === 5 && value) {
      const otpString = newOtp.join("");
      if (otpString.length === 6) {
        handleVerify(otpString);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpString?: string) => {
    const otpValue = otpString || otp.join("");
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits",
        variant: "destructive",
      });
      return;
    }

    // Mock verification - in real app, verify with backend
    localStorage.setItem("hasLoggedIn", "true");
    localStorage.removeItem("tempMobile");
    
    toast({
      title: "Login Successful",
      description: "Welcome to Digital Samaj Admin",
    });

    onSuccess();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/20 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="mb-8 flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* OTP Card */}
        <div className="bg-card rounded-3xl shadow-lg p-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-card-foreground mb-2">
            Enter OTP
          </h2>
          <p className="text-muted-foreground mb-8">
            We sent a code to +91 {mobile}
          </p>

          {/* OTP Input Boxes */}
          <div className="flex gap-3 mb-8 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-16 text-center text-2xl font-semibold rounded-2xl border-2 border-border focus:border-primary focus:outline-none transition-all bg-background"
              />
            ))}
          </div>

          <Button
            onClick={() => handleVerify()}
            className="w-full h-14 text-base rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            Verify & Continue
          </Button>

          <button className="w-full mt-4 text-sm text-primary hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
