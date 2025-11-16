import { useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, MessageCircle, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "like" | "comment" | "complaint" | "status";
  message: string;
  time: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: "1",
      type: "like",
      message: "John Doe liked your notice 'Community Meeting'",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      message: "Jane Smith commented on 'Water Supply Maintenance'",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "complaint",
      message: "New complaint filed by Mike Johnson",
      time: "1 day ago",
      read: true,
    },
  ];

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="w-5 h-5 text-primary" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-accent-foreground" />;
      case "complaint":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "status":
        return <CheckCircle className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-8">
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
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
      </header>

      <main className="px-6 py-6">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card rounded-3xl shadow-md p-5 animate-fade-in ${
                !notification.read ? "border-2 border-primary/20" : ""
              }`}
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
