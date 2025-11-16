import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AIAssistant = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "AI Assistant",
      description: "AI Assistant feature coming soon!",
    });
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-24 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-xl z-40 animate-pulse-glow"
    >
      <Bot className="w-7 h-7" />
    </Button>
  );
};

export default AIAssistant;
