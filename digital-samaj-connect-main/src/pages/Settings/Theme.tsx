import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Sun, Moon } from 'lucide-react';

const Theme = () => {
  const [theme, setTheme] = useState(storage.getTheme());
  const { toast } = useToast();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    storage.setTheme(newTheme);
    toast({ title: "Theme Updated", description: `Switched to ${newTheme} mode` });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Theme</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <Card
            onClick={() => handleThemeChange('light')}
            className={`p-8 flex flex-col items-center gap-4 cursor-pointer ${
              theme === 'light' ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Sun className="h-16 w-16" />
            <span className="text-lg font-semibold">Light</span>
          </Card>

          <Card
            onClick={() => handleThemeChange('dark')}
            className={`p-8 flex flex-col items-center gap-4 cursor-pointer ${
              theme === 'dark' ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Moon className="h-16 w-16" />
            <span className="text-lg font-semibold">Dark</span>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Theme;
