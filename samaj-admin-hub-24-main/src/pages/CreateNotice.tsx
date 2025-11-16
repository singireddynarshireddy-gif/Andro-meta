import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CreateNotice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice Posted",
      description: "All residents have been notified",
    });

    navigate("/notices");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-8">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/notices")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Create Notice</h1>
            <p className="text-xs text-muted-foreground">Post to all residents</p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="px-6 py-6">
        <div className="bg-card rounded-3xl shadow-md p-6 space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 rounded-2xl text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Write your notice details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[200px] rounded-2xl text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Attachment (Optional)</Label>
            {!attachment ? (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image or PDF
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between bg-muted rounded-2xl p-4">
                <span className="text-sm text-foreground truncate flex-1">
                  {attachment.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAttachment(null)}
                  className="rounded-full flex-shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-base rounded-2xl font-semibold shadow-md hover:shadow-lg"
            size="lg"
          >
            Post Notice
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreateNotice;
