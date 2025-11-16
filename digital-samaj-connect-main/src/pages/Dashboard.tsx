import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { FileText, IndianRupee, ShoppingBag, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    { icon: FileText, label: 'Notices', path: '/notices', color: 'bg-blue-500' },
    { icon: IndianRupee, label: 'Bills', path: '/bills', color: 'bg-green-500' },
    { icon: ShoppingBag, label: 'Shop & Sell', path: '/shop', color: 'bg-orange-500' },
    { icon: Users, label: 'Communities', path: '/communities', color: 'bg-purple-500' },
  ];

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                onClick={() => navigate(item.path)}
                className="p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-lg transition-shadow aspect-square"
              >
                <div className={`${item.color} p-6 rounded-full`}>
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <span className="text-lg font-semibold text-center">{item.label}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
