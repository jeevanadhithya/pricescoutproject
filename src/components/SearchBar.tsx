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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 md:px-0">
      <div 
        className={cn(
          "relative flex flex-col md:flex-row md:items-center rounded-2xl transition-all duration-500",
          "bg-secondary/50 border-2",
          isFocused 
            ? "border-primary shadow-glow-lg md:scale-[1.02]" 
            : "border-border hover:border-primary/50"
        )}
      >
        <div className="absolute left-4 md:left-5 top-4 md:top-1/2 md:-translate-y-1/2 flex items-center pointer-events-none">
          <Search 
            className={cn(
              "w-5 h-5 md:w-6 md:h-6 transition-colors duration-300",
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
          placeholder="Search any product..."
          className={cn(
            "w-full py-4 md:py-5 pl-12 md:pl-14 pr-4 md:pr-36 bg-transparent text-base md:text-lg font-medium",
            "placeholder:text-muted-foreground/60 outline-none",
            "text-foreground"
          )}
        />
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={cn(
            "md:absolute md:right-3 flex items-center justify-center gap-2 mx-3 mb-3 md:m-0 px-5 md:px-6 py-3 rounded-xl",
            "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground",
            "font-semibold text-sm md:text-base transition-all duration-300",
            "hover:shadow-glow hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          )}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span>Compare Prices</span>
            </>
          )}
        </button>
      </div>
      
      <p className="mt-3 md:mt-4 text-center text-muted-foreground text-xs md:text-sm px-2">
        Compare prices across 12+ Indian retailers like Amazon, Flipkart, Croma & more
      </p>
    </form>
  );
};

export default SearchBar;
