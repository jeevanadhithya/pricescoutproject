import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div 
        className={cn(
          "relative flex items-center rounded-2xl transition-all duration-500",
          "bg-secondary/50 border-2",
          isFocused 
            ? "border-primary shadow-glow-lg scale-[1.02]" 
            : "border-border hover:border-primary/50"
        )}
      >
        <div className="absolute left-5 flex items-center pointer-events-none">
          <Search 
            className={cn(
              "w-6 h-6 transition-colors duration-300",
              isFocused ? "text-primary" : "text-muted-foreground"
            )} 
          />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search any product... iPhone, MacBook, PlayStation..."
          className={cn(
            "w-full py-5 pl-14 pr-36 bg-transparent text-lg font-medium",
            "placeholder:text-muted-foreground/60 outline-none",
            "text-foreground"
          )}
        />
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={cn(
            "absolute right-3 flex items-center gap-2 px-6 py-3 rounded-xl",
            "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground",
            "font-semibold text-base transition-all duration-300",
            "hover:shadow-glow hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          )}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Compare</span>
            </>
          )}
        </button>
      </div>
      
      <p className="mt-4 text-center text-muted-foreground text-sm">
        Compare prices across 10+ trusted retailers instantly
      </p>
    </form>
  );
};

export default SearchBar;
