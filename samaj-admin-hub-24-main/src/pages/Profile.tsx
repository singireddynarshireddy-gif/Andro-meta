import { useNavigate } from "react-router-dom";
import { Settings, UserPlus, Users, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Profile = () => {
  const navigate = useNavigate();
  const adminName = "Admin User";

  const menuItems = [
    { icon: Users, label: "Add Family Members", action: () => {} },
    { icon: UserPlus, label: "Invite Someone", action: () => {} },
    { icon: FileText, label: "Documents", action: () => {} },
    { icon: Settings, label: "Settings", action: () => navigate("/settings") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      <main className="px-6 py-8">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl shadow-md p-8 mb-6 text-center animate-fade-in">
          <Avatar className="w-24 h-24 mx-auto mb-4 bg-primary text-primary-foreground text-2xl">
            <AvatarFallback>{adminName[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-foreground mb-1">{adminName}</h2>
          <p className="text-sm text-muted-foreground">Admin</p>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-3xl shadow-md overflow-hidden animate-fade-in">
          {menuItems.map((item, index) => {
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
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Profile;
