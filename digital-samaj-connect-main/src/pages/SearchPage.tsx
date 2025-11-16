import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  
  // Mock resident data
  const residents = [
    { id: 1, name: 'John Doe', phone: '9876543210', flat: 'A-101' },
    { id: 2, name: 'Jane Smith', phone: '9876543211', flat: 'B-202' },
    { id: 3, name: 'Mike Johnson', phone: '9876543212', flat: 'C-303' },
  ];

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(query.toLowerCase()) ||
      resident.phone.includes(query)
  );

  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Search Residents</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search by name or mobile number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {query === '' ? (
          <Card className="p-8 text-center">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Enter a name or mobile number to search</p>
          </Card>
        ) : filteredResidents.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No Results Found</p>
            <p className="text-sm text-muted-foreground mt-2">Try searching with a different name or number</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredResidents.map((resident) => (
              <Card key={resident.id} className="p-4">
                <h3 className="font-semibold text-lg">{resident.name}</h3>
                <p className="text-muted-foreground">📱 {resident.phone}</p>
                <p className="text-muted-foreground">🏠 Flat {resident.flat}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchPage;
