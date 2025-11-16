import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/lib/storage';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (storage.isFirstTime()) {
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">🏘️</div>
          <h1 className="text-5xl font-bold text-primary-foreground mb-2">Digital Samaj</h1>
          <p className="text-primary-foreground/80 text-lg">Your Community, Connected</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
