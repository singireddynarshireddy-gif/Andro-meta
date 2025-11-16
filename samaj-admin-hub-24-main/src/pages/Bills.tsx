import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Bills = () => {
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
          <h1 className="text-xl font-bold">Bills</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <Tabs defaultValue="dues" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-2xl">
            <TabsTrigger value="dues" className="rounded-xl">Dues</TabsTrigger>
            <TabsTrigger value="paid" className="rounded-xl">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="dues" className="space-y-4">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground shadow-lg">
              <p className="text-sm opacity-90 mb-1">Total Due Amount</p>
              <p className="text-4xl font-bold mb-3">₹12,500</p>
              <p className="text-sm opacity-75">Due Date: March 31, 2024</p>
            </div>
            <div className="text-center py-8 text-muted-foreground">
              Admin view: All resident bills listed here
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="text-center py-8 text-muted-foreground">
              Paid bills history
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Bills;
