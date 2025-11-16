import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const AppUpdates = () => {
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">App Updates</h1>
        
        <Card className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">You're Up to Date!</h2>
          <p className="text-muted-foreground">
            Your app is already updated to the latest version.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Version 1.0.0
          </p>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AppUpdates;
