import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const Notices = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedNotices = storage.getNotices();
    if (savedNotices.length === 0) {
      // Initialize with sample notices
      const sampleNotices = [
        {
          id: 1,
          title: 'Community Meeting',
          content: 'Annual general meeting scheduled for next Sunday at 10 AM in the clubhouse.',
          likes: 5,
          likedByMe: false,
          comments: [],
          date: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Maintenance Work',
          content: 'Water supply will be interrupted tomorrow from 9 AM to 2 PM for maintenance.',
          likes: 12,
          likedByMe: false,
          comments: [],
          date: new Date().toISOString()
        }
      ];
      storage.saveNotices(sampleNotices);
      setNotices(sampleNotices);
    } else {
      setNotices(savedNotices);
    }
  }, []);

  const handleLike = (noticeId: number) => {
    const updated = notices.map(notice => {
      if (notice.id === noticeId) {
        const newLikedState = !notice.likedByMe;
        return {
          ...notice,
          likes: notice.likes + (newLikedState ? 1 : -1),
          likedByMe: newLikedState
        };
      }
      return notice;
    });
    setNotices(updated);
    storage.saveNotices(updated);
    storage.addNotification('Notice interaction updated');
  };

  const handleAddComment = (noticeId: number) => {
    const commentText = commentTexts[noticeId]?.trim();
    if (!commentText) return;

    const updated = notices.map(notice => {
      if (notice.id === noticeId) {
        return {
          ...notice,
          comments: [...(notice.comments || []), { id: Date.now(), text: commentText, user: 'You' }]
        };
      }
      return notice;
    });
    setNotices(updated);
    storage.saveNotices(updated);
    setCommentTexts({ ...commentTexts, [noticeId]: '' });
    storage.addNotification('New comment added to notice');
    toast({ title: "Comment Added", description: "Your comment has been posted" });
  };

  const handleDeleteComment = (noticeId: number, commentId: number) => {
    const updated = notices.map(notice => {
      if (notice.id === noticeId) {
        return {
          ...notice,
          comments: notice.comments.filter((c: any) => c.id !== commentId)
        };
      }
      return notice;
    });
    setNotices(updated);
    storage.saveNotices(updated);
    toast({ title: "Comment Deleted" });
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-3xl font-bold mb-6">Notices</h1>
        
        {notices.map(notice => (
          <Card key={notice.id} className="p-4">
            <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
            <p className="text-muted-foreground mb-4">{notice.content}</p>
            
            <div className="flex gap-4 mb-4">
              <Button
                variant={notice.likedByMe ? "default" : "outline"}
                size="sm"
                onClick={() => handleLike(notice.id)}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                {notice.likes}
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {notice.comments?.length || 0}
              </Button>
            </div>

            {notice.comments?.length > 0 && (
              <div className="space-y-2 mb-4">
                {notice.comments.map((comment: any) => (
                  <div key={comment.id} className="bg-muted p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold text-sm">{comment.user}</span>
                        <p className="text-sm mt-1">{comment.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(notice.id, comment.id)}
                        className="text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={commentTexts[notice.id] || ''}
                onChange={(e) => setCommentTexts({ ...commentTexts, [notice.id]: e.target.value })}
                className="min-h-[60px]"
              />
              <Button onClick={() => handleAddComment(notice.id)}>Post</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Notices;
