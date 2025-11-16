import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const notifs = storage.getNotifications();
    setNotifications(notifs);
    
    // Mark all as read
    const updated = notifs.map((n: any) => ({ ...n, read: true }));
    storage.saveNotifications(updated);
  }, []);

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        
        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No notifications yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <Card key={notif.id} className="p-4">
                <p className="mb-2">{notif.message}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(notif.timestamp).toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
