import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus } from 'lucide-react';

const FontSize = () => {
  const [size, setSize] = useState(storage.getFontSize());
  const { toast } = useToast();

  const sizes = ['small', 'medium', 'large', 'xlarge'];
  const sizeIndex = sizes.indexOf(size);

  const handleIncrease = () => {
    if (sizeIndex < sizes.length - 1) {
      const newSize = sizes[sizeIndex + 1];
      setSize(newSize);
      storage.setFontSize(newSize);
      toast({ title: "Font Size Increased" });
    } else {
      toast({ title: "Maximum Size Reached", description: "Cannot increase font size further" });
    }
  };

  const handleDecrease = () => {
    if (sizeIndex > 0) {
      const newSize = sizes[sizeIndex - 1];
      setSize(newSize);
      storage.setFontSize(newSize);
      toast({ title: "Font Size Decreased" });
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'large': return 'text-xl';
      case 'xlarge': return 'text-2xl';
      default: return 'text-base';
    }
  };

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Font Size</h1>
        
        <Card className="p-8 mb-6">
          <p className={`${getSizeClass()} mb-6 text-center`}>
            This is a sample text to preview the font size.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrease}
              disabled={sizeIndex === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center px-6 bg-muted rounded-md">
              <span className="font-semibold capitalize">{size}</span>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrease}
              disabled={sizeIndex === sizes.length - 1}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FontSize;
