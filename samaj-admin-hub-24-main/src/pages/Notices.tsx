import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, ThumbsUp, MessageCircle, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

interface Notice {
  id: string;
  title: string;
  preview: string;
  likes: number;
  comments: number;
  date: string;
  category: string;
}

const Notices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: "1",
      title: "Community Meeting - February 2024",
      preview: "Important discussion regarding new amenities and maintenance schedule...",
      likes: 24,
      comments: 8,
      date: "2024-02-15",
      category: "Meeting",
    },
    {
      id: "2",
      title: "Water Supply Maintenance",
      preview: "Water supply will be interrupted on Sunday from 10 AM to 2 PM...",
      likes: 45,
      comments: 12,
      date: "2024-02-14",
      category: "Maintenance",
    },
    {
      id: "3",
      title: "Festival Celebration",
      preview: "Join us for the Holi celebration at the community clubhouse...",
      likes: 67,
      comments: 23,
      date: "2024-02-10",
      category: "Event",
    },
  ]);

  const handleDeleteClick = (noticeId: string) => {
    setSelectedNotice(noticeId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedNotice) {
      setNotices(notices.filter((n) => n.id !== selectedNotice));
      toast({
        title: "Notice Deleted",
        description: "The notice has been removed successfully",
      });
      setDeleteDialogOpen(false);
      setSelectedNotice(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Meeting: "bg-primary/10 text-primary",
      Maintenance: "bg-accent/20 text-accent-foreground",
      Event: "bg-highlight/30 text-highlight-foreground",
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Notices</h1>
              <p className="text-xs text-muted-foreground">Admin Board</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/notices/create")}
            size="icon"
            className="rounded-full shadow-md"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-6">
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-card rounded-3xl shadow-md p-6 hover:shadow-lg transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Badge className={`mb-2 ${getCategoryColor(notice.category)}`}>
                    {notice.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {notice.preview}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteClick(notice.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full flex-shrink-0 ml-2"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{notice.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{notice.comments}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(notice.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notices yet</p>
            <Button
              onClick={() => navigate("/notices/create")}
              className="mt-4 rounded-2xl"
            >
              Create First Notice
            </Button>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notice?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The notice will be permanently removed and all residents will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="rounded-2xl bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Notices;
