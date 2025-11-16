import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

const Language = () => {
  const [language, setLanguage] = useState(storage.getLanguage());
  const { toast } = useToast();

  const languages = ['English', 'Hindi', 'Telugu'];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    storage.setLanguage(lang);
    toast({ title: "Language Updated", description: `Changed to ${lang}` });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Language</h1>
        
        <div className="space-y-4">
          {languages.map((lang) => (
            <Card
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`p-4 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow ${
                language === lang ? 'ring-2 ring-primary' : ''
              }`}
            >
              <span className="text-lg font-semibold">{lang}</span>
              {language === lang && <Check className="h-5 w-5 text-primary" />}
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Language;
