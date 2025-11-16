import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";
import AIAssistant from "@/components/AIAssistant";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/10 pb-24">
      <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold mb-4">Search Residents</h1>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or mobile"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl"
            />
          </div>
        </div>
      </header>

      <main className="px-6 py-6">
        {!searchQuery ? (
          <div className="text-center py-12 text-muted-foreground">
            Enter name or mobile to search residents
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No residents found
          </div>
        )}
      </main>

      <AIAssistant />
      <BottomNav />
    </div>
  );
};

export default Search;
