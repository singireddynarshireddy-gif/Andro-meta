import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: "in-progress" | "resolved";
  date: string;
  residentName: string;
}

const ComplaintBox = () => {
  const navigate = useNavigate();
  const [complaints] = useState<Complaint[]>([
    {
      id: "1",
      title: "Street Light Issue",
      description: "Street light near block B is not working",
      status: "in-progress",
      date: "2024-02-15",
      residentName: "John Doe",
    },
    {
      id: "2",
      title: "Water Leakage",
      description: "Water leaking in common area",
      status: "resolved",
      date: "2024-02-14",
      residentName: "Jane Smith",
    },
  ]);

  const inProgressComplaints = complaints.filter((c) => c.status === "in-progress");
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved");

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
          <h1 className="text-xl font-bold">Complaint Box</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 rounded-2xl">
            <TabsTrigger value="in-progress" className="rounded-xl">
              In Progress ({inProgressComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="rounded-xl">
              Resolved ({resolvedComplaints.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-4">
            {inProgressComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-card rounded-3xl shadow-md p-6 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{complaint.title}</h3>
                  <Badge className="bg-accent/20 text-accent-foreground">In Progress</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{complaint.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>By: {complaint.residentName}</span>
                  <span>{new Date(complaint.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-card rounded-3xl shadow-md p-6 opacity-75 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{complaint.title}</h3>
                  <Badge className="bg-primary/20 text-primary">Resolved</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{complaint.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>By: {complaint.residentName}</span>
                  <span>{new Date(complaint.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default ComplaintBox;
