import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { ProductResults } from "@/components/ProductResults";
import { FeaturedCategories } from "@/components/FeaturedCategories";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery("");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSearchQuery(query);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-0 md:px-6">
        <HeroSection />
        
        <div className="relative z-10 -mt-2 md:-mt-4">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <ProductResults query={searchQuery} isLoading={isLoading} />

        {!searchQuery && !isLoading && (
          <FeaturedCategories onCategoryClick={handleSearch} />
        )}

        {/* Footer */}
        <footer className="py-8 md:py-12 mt-12 md:mt-20 border-t border-border text-center px-4">
          <p className="text-muted-foreground text-xs md:text-sm">
            © 2024 PriceScout. Compare prices from trusted Indian retailers.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
