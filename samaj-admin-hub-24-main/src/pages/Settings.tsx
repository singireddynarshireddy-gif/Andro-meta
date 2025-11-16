import { useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, Type, Globe, MessageSquare, Star, RefreshCw, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: Palette, label: "Theme", action: () => {} },
    { icon: Type, label: "Font Size", action: () => {} },
    { icon: Globe, label: "Language Settings", action: () => {} },
    { icon: MessageSquare, label: "Feedback", action: () => {} },
    { icon: Star, label: "Rate Us", action: () => {} },
    { icon: RefreshCw, label: "App Updates", action: () => {} },
    { icon: Phone, label: "Change Mobile Number", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="bg-card rounded-3xl shadow-md overflow-hidden mb-4 animate-fade-in">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button className="w-full bg-destructive/10 text-destructive rounded-3xl p-5 flex items-center justify-between hover:bg-destructive/20 transition-colors animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-semibold">Leave Community</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
