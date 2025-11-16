import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Shop = () => {
  const [mode, setMode] = useState<'shop' | 'sell' | null>(null);
  const [cart, setCart] = useState(storage.getCart());
  const navigate = useNavigate();

  const foodItems = [
    { id: 1, name: 'Pizza', price: 350, image: '🍕', vendor: 'Italian Corner' },
    { id: 2, name: 'Burger', price: 150, image: '🍔', vendor: 'Burger Hub' },
    { id: 3, name: 'Biryani', price: 280, image: '🍛', vendor: 'Spice Kitchen' },
  ];

  const choresItems = [
    { id: 4, name: 'House Cleaning', price: 500, image: '🧹', vendor: 'CleanPro' },
    { id: 5, name: 'Plumbing Service', price: 800, image: '🔧', vendor: 'FixIt Services' },
    { id: 6, name: 'Electrical Work', price: 600, image: '💡', vendor: 'Spark Solutions' },
  ];

  const amenitiesItems = [
    { id: 7, name: 'Clubhouse', price: 1000, image: '🏢', vendor: 'Community Center' },
    { id: 8, name: 'Swimming Pool', price: 300, image: '🏊', vendor: 'Aqua Zone' },
    { id: 9, name: 'Gym', price: 200, image: '💪', vendor: 'Fitness Hub' },
  ];

  const addToCart = (item: any) => {
    const existingItem = cart.find((i: any) => i.id === item.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map((i: any) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    
    setCart(updatedCart);
    storage.saveCart(updatedCart);
  };

  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);

  if (!mode) {
    return (
      <AppLayout>
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-8">Shop & Sell</h1>
          <div className="flex gap-4 w-full max-w-md">
            <Button
              onClick={() => setMode('shop')}
              size="lg"
              className="flex-1 h-32 text-2xl"
            >
              🛒 Shop
            </Button>
            <Button
              onClick={() => setMode('sell')}
              size="lg"
              variant="outline"
              className="flex-1 h-32 text-2xl"
            >
              💰 Sell
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (mode === 'sell') {
    return (
      <AppLayout>
        <div className="p-4">
          <Button variant="ghost" onClick={() => setMode(null)} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold mb-6">Sell Items</h1>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Sell feature coming soon!</p>
            <p className="text-sm text-muted-foreground">List your items or services for the community</p>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const ItemCard = ({ item }: { item: any }) => (
    <Card className="p-4">
      <div className="text-6xl mb-3 text-center">{item.image}</div>
      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{item.vendor}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">₹{item.price}</span>
        <Button size="sm" onClick={() => addToCart(item)}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </Card>
  );

  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => setMode(null)}>
            ← Back
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/cart')}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-6">Shop</h1>

        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="chores">Chores</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="grid grid-cols-2 gap-4">
            {foodItems.map(item => <ItemCard key={item.id} item={item} />)}
          </TabsContent>

          <TabsContent value="chores" className="grid grid-cols-2 gap-4">
            {choresItems.map(item => <ItemCard key={item.id} item={item} />)}
          </TabsContent>

          <TabsContent value="amenities" className="grid grid-cols-2 gap-4">
            {amenitiesItems.map(item => <ItemCard key={item.id} item={item} />)}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Shop;
