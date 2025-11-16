import { useNavigate } from "react-router-dom";
import { Bell, Settings, Globe, FileText, Receipt, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Dashboard = () => {
  const navigate = useNavigate();

  const mainSections = [
    {
      id: "notices",
      title: "Notices",
      icon: FileText,
      path: "/notices",
      gradient: "from-primary to-primary/80",
    },
    {
      id: "bills",
      title: "Bills",
      icon: Receipt,
      path: "/bills",
      gradient: "from-accent to-accent/80",
    },
    {
      id: "shop",
      title: "Shop",
      icon: ShoppingBag,
      path: "/shop",
      gradient: "from-highlight to-highlight/80",
    },
    {
      id: "communities",
      title: "Communities",
      icon: Users,
      path: "/communities",
      gradient: "from-secondary to-secondary/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Digital Samaj</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="rounded-full hover:bg-muted"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="rounded-full hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
              className="rounded-full hover:bg-muted relative"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">Main Sections</h2>

        {/* Grid of Main Sections */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {mainSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                className={`
                  relative overflow-hidden rounded-3xl p-6 h-40
                  bg-gradient-to-br ${section.gradient}
                  shadow-md hover:shadow-lg
                  transform hover:scale-105 transition-all duration-300
                  flex flex-col items-center justify-center
                  text-white animate-fade-in
                `}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <Icon className="w-12 h-12 mb-3 relative z-10" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold relative z-10">{section.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-card rounded-3xl shadow-md p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Active Notices</p>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-accent">12</p>
              <p className="text-sm text-muted-foreground">Pending Complaints</p>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-highlight-foreground">8</p>
              <p className="text-sm text-muted-foreground">Communities</p>
            </div>
            <div className="bg-muted rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">156</p>
              <p className="text-sm text-muted-foreground">Total Residents</p>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
