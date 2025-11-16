import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { UserPlus, QrCode, FileText, Edit } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(storage.getUserProfile());
  const [familyMembers, setFamilyMembers] = useState(storage.getFamilyMembers());
  const [documents, setDocuments] = useState(storage.getDocuments());
  const [showQR, setShowQR] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveName = () => {
    const updated = { ...profile, name: editName };
    setProfile(updated);
    storage.setUserProfile(updated);
    setEditMode(false);
    toast({ title: "Profile Updated", description: "Your name has been updated" });
  };

  const handleAddFamilyMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember = {
      id: Date.now(),
      name: formData.get('name'),
      relation: formData.get('relation')
    };
    const updated = [...familyMembers, newMember];
    setFamilyMembers(updated);
    storage.saveFamilyMembers(updated);
    toast({ title: "Family Member Added" });
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold">
              {getInitial(profile.name)}
            </div>
            <div className="flex-1">
              {editMode ? (
                <div className="flex gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSaveName}>Save</Button>
                  <Button variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setEditMode(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-muted-foreground">📱 {storage.getPhone()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Family
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddFamilyMember} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="relation">Relation</Label>
                    <Input id="relation" name="relation" required placeholder="e.g., Father, Mother, Spouse" />
                  </div>
                  <Button type="submit" className="w-full">Add</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => setShowQR(true)}>
              <QrCode className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Family Members</h3>
          {familyMembers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No family members added</p>
          ) : (
            <div className="space-y-2">
              {familyMembers.map((member: any) => (
                <div key={member.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Documents</h3>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          {documents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No Documents Uploaded</p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc: any) => (
                <div key={doc.id} className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold">{doc.name}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Someone</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8">
              <div className="text-8xl mb-4">📱</div>
              <p className="text-muted-foreground mb-4">Scan QR Code to Join</p>
              <p className="text-sm text-muted-foreground">Share this QR code with others to invite them</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Profile;
