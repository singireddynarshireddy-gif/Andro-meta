import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Shop = () => {
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
          <h1 className="text-xl font-bold">Shop</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 rounded-2xl">
            <TabsTrigger value="food" className="rounded-xl">Food</TabsTrigger>
            <TabsTrigger value="chores" className="rounded-xl">Chores</TabsTrigger>
            <TabsTrigger value="amenities" className="rounded-xl">Amenities</TabsTrigger>
          </TabsList>

          <TabsContent value="food">
            <div className="text-center py-8 text-muted-foreground">
              Food items available for purchase
            </div>
          </TabsContent>

          <TabsContent value="chores">
            <div className="text-center py-8 text-muted-foreground">
              Services: Electrician, Plumbing, etc.
            </div>
          </TabsContent>

          <TabsContent value="amenities">
            <div className="text-center py-8 text-muted-foreground">
              Clubhouse, Pool booking
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Shop;
