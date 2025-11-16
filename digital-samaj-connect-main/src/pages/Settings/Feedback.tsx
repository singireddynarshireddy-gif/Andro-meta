import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSubmitted(true);
      toast({ title: "Feedback Submitted", description: "Thank you for your valuable feedback!" });
    }
  };

  if (submitted) {
    return (
      <AppLayout>
        <div className="p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your feedback has been submitted successfully. We appreciate your input!
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit More Feedback</Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-2">Feedback</h1>
        <p className="text-muted-foreground mb-6">
          We'd love to hear from you! Share your thoughts and suggestions.
        </p>
        
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            <Textarea
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[200px] mb-4"
              required
            />
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
};

export default Feedback;
