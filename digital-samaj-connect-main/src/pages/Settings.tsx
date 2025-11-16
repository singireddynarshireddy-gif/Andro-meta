import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { label: 'Theme', path: '/settings/theme' },
    { label: 'Font Size', path: '/settings/font-size' },
    { label: 'Language', path: '/language' },
    { label: 'Feedback', path: '/settings/feedback' },
    { label: 'Rate Us', path: '/settings/rate' },
    { label: 'App Updates', path: '/settings/updates' },
    { label: 'Change Mobile Number', path: '/settings/change-mobile' },
    { label: 'Leave Community', path: '/settings/leave-community', danger: true },
  ];

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Card className="divide-y">
          {settingsItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex justify-between items-center p-4 hover:bg-muted transition-colors ${
                item.danger ? 'text-destructive' : ''
              }`}
            >
              <span className="text-lg">{item.label}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
