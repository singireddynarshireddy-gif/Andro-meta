import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(storage.getCart());
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateQuantity = (itemId: number, change: number) => {
    const updatedCart = cart.map((item: any) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    storage.saveCart(updatedCart);
  };

  const removeItem = (itemId: number) => {
    const updatedCart = cart.filter((item: any) => item.id !== itemId);
    setCart(updatedCart);
    storage.saveCart(updatedCart);
    toast({ title: "Item Removed", description: "Item removed from cart" });
  };

  const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    storage.saveCart([]);
    setCart([]);
    storage.addNotification(`Payment of ₹${total} successful`);
    toast({
      title: "Payment Successful",
      description: `Paid ₹${total}. Order confirmed!`,
    });
    navigate('/shop');
  };

  if (cart.length === 0) {
    return (
      <AppLayout>
        <div className="p-4">
          <Button variant="ghost" onClick={() => navigate('/shop')}>
            ← Back to Shop
          </Button>
          <Card className="p-8 text-center mt-8">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4">
        <Button variant="ghost" onClick={() => navigate('/shop')} className="mb-4">
          ← Back to Shop
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Cart</h1>

        <div className="space-y-4 mb-24">
          {cart.map((item: any) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <div className="text-4xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.vendor}</p>
                  <p className="text-lg font-bold">₹{item.price}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-16 left-0 right-0 bg-card border-t p-4">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">₹{total}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full" size="lg">
            Pay ₹{total}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cart;
