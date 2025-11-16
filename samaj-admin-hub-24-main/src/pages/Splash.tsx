import { Building2 } from "lucide-react";

const Splash = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center animate-fade-in">
      <div className="text-center animate-scale-in">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-2xl animate-pulse-glow" />
            <Building2 className="w-24 h-24 text-primary-foreground relative z-10" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">
          Digital Samaj
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          Admin Portal
        </p>
      </div>
    </div>
  );
};

export default Splash;
