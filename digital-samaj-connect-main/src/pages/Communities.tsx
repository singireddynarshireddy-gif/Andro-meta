import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Info, Users } from 'lucide-react';

const Communities = () => {
  const [communities, setCommunities] = useState<any>({ created: [], joined: [] });
  const [allCommunities, setAllCommunities] = useState<any[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setCommunities(storage.getCommunities());
    // Mock available communities
    setAllCommunities([
      { id: 1, name: 'Sports Club', category: 'Sports', type: 'free', members: 45 },
      { id: 2, name: 'Art & Craft', category: 'Arts', type: 'free', members: 32 },
      { id: 3, name: 'Yoga Classes', category: 'Health', type: 'paid', members: 28 },
    ]);
  }, []);

  const handleCreateCommunity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCommunity = {
      id: Date.now(),
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
      type: formData.get('type'),
      members: 1
    };
    
    const updated = {
      ...communities,
      created: [...communities.created, newCommunity]
    };
    setCommunities(updated);
    storage.saveCommunities(updated);
    setShowCreateDialog(false);
    toast({ title: "Community Created", description: `${newCommunity.name} has been created successfully` });
  };

  const handleJoinCommunity = (community: any) => {
    const isJoined = communities.joined.some((c: any) => c.id === community.id);
    if (isJoined) return;

    const updated = {
      ...communities,
      joined: [...communities.joined, community]
    };
    setCommunities(updated);
    storage.saveCommunities(updated);
    toast({ title: "Joined Community", description: `You've joined ${community.name}` });
  };

  const totalCommunities = communities.created.length + communities.joined.length;

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Communities</h1>

        <div className="flex gap-4 mb-6">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex-1">Create Community</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Community</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateCommunity} className="space-y-4">
                <div>
                  <Label htmlFor="name">Community Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Create</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex-1" onClick={() => setShowJoinDialog(true)}>
            Join Community
          </Button>
        </div>

        {totalCommunities === 0 ? (
          <Card className="p-8 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No Communities Joined Yet</p>
            <p className="text-sm text-muted-foreground mt-2">Create or join a community to get started</p>
          </Card>
        ) : (
          <Tabs defaultValue="created" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="created">Created</TabsTrigger>
              <TabsTrigger value="joined">Joined</TabsTrigger>
            </TabsList>

            <TabsContent value="created" className="space-y-4">
              {communities.created.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No communities created yet</p>
                </Card>
              ) : (
                communities.created.map((community: any) => (
                  <Card key={community.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{community.name}</h3>
                        <p className="text-sm text-muted-foreground">{community.category}</p>
                        <p className="text-sm mt-2">{community.description}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="joined" className="space-y-4">
              {communities.joined.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No communities joined yet</p>
                </Card>
              ) : (
                communities.joined.map((community: any) => (
                  <Card key={community.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{community.name}</h3>
                        <p className="text-sm text-muted-foreground">{community.category}</p>
                        <p className="text-sm text-muted-foreground">{community.members} members</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}

        <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Community</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {allCommunities.map((community) => {
                const isJoined = communities.joined.some((c: any) => c.id === community.id);
                return (
                  <Card key={community.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{community.name}</h3>
                        <p className="text-sm text-muted-foreground">{community.category} • {community.type}</p>
                        <p className="text-xs text-muted-foreground">{community.members} members</p>
                      </div>
                      <Button
                        onClick={() => handleJoinCommunity(community)}
                        disabled={isJoined}
                        variant={isJoined ? "outline" : "default"}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Communities;
