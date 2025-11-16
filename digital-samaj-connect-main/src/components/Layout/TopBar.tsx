import { Settings, Languages, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

export const TopBar = () => {
  const navigate = useNavigate();
  const notifications = storage.getNotifications();
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50 h-14">
      <div className="flex justify-end items-center h-full px-4 gap-4 max-w-screen-xl mx-auto">
        <button
          onClick={() => navigate('/settings')}
          className="text-foreground hover:text-primary transition-colors"
        >
          <Settings className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate('/language')}
          className="text-foreground hover:text-primary transition-colors"
        >
          <Languages className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate('/notifications')}
          className="text-foreground hover:text-primary transition-colors relative"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              {unreadCount}
            </Badge>
          )}
        </button>
      </div>
    </div>
  );
};
