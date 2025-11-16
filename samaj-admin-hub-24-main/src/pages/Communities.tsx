import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Communities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Communities</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="text-center py-12 text-muted-foreground">
          Create or join communities
        </div>
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Communities;
