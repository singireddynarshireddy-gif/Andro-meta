import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setComplaints(storage.getComplaints());
  }, []);

  const handleFileComplaint = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newComplaint = {
      id: Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      status: 'In-Progress',
      date: new Date().toISOString()
    };

    const updated = [...complaints, newComplaint];
    setComplaints(updated);
    storage.saveComplaints(updated);
    storage.addNotification('Your complaint is filed successfully. Admin will review it soon.');
    
    setShowDialog(false);
    toast({
      title: "Complaint Filed",
      description: "Your complaint has been submitted successfully",
    });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Complaint Box</h1>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>File Complaint</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>File a Complaint</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFileComplaint} className="space-y-4">
                <div>
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required className="min-h-[100px]" />
                </div>
                <div>
                  <Label htmlFor="proof">Upload Proof (Image/Video)</Label>
                  <Input id="proof" name="proof" type="file" accept="image/*,video/*" />
                </div>
                <Button type="submit" className="w-full">Submit Complaint</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {complaints.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No Complaints Filed Yet</p>
            <Button onClick={() => setShowDialog(true)}>File Your First Complaint</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{complaint.title}</h3>
                  <Badge variant={complaint.status === 'Resolved' ? 'default' : 'secondary'}>
                    {complaint.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-2">{complaint.description}</p>
                <p className="text-sm text-muted-foreground">
                  Filed on {new Date(complaint.date).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Complaints;
