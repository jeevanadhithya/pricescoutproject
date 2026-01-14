import { useState, useEffect } from "react";
import { Package, TrendingDown, Store, Clock } from "lucide-react";
import { PriceCard } from "./PriceCard";
import { Icon3D } from "./Icon3D";

interface Store {
  name: string;
  logo: string;
  price: number;
  originalPrice?: number;
  url: string;
  rating: number;
  shipping: string;
  verified: boolean;
}

interface ProductResultsProps {
  query: string;
  isLoading: boolean;
}

// Mock data generator for different products
const generateStoreData = (query: string): Store[] => {
  const basePrice = Math.random() * 500 + 100;
  
  const stores = [
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", baseModifier: 0 },
    { name: "Walmart", logo: "https://logo.clearbit.com/walmart.com", baseModifier: -5 },
    { name: "Best Buy", logo: "https://logo.clearbit.com/bestbuy.com", baseModifier: 15 },
    { name: "Target", logo: "https://logo.clearbit.com/target.com", baseModifier: 8 },
    { name: "eBay", logo: "https://logo.clearbit.com/ebay.com", baseModifier: -12 },
    { name: "Newegg", logo: "https://logo.clearbit.com/newegg.com", baseModifier: -3 },
    { name: "Costco", logo: "https://logo.clearbit.com/costco.com", baseModifier: -8 },
    { name: "B&H Photo", logo: "https://logo.clearbit.com/bhphotovideo.com", baseModifier: 5 },
    { name: "Adorama", logo: "https://logo.clearbit.com/adorama.com", baseModifier: 2 },
    { name: "Micro Center", logo: "https://logo.clearbit.com/microcenter.com", baseModifier: -15 },
    { name: "Office Depot", logo: "https://logo.clearbit.com/officedepot.com", baseModifier: 20 },
    { name: "Staples", logo: "https://logo.clearbit.com/staples.com", baseModifier: 18 },
  ];

  return stores.map(store => {
    const randomVariance = (Math.random() - 0.5) * 30;
    const price = Math.max(basePrice + store.baseModifier + randomVariance, 50);
    const hasDiscount = Math.random() > 0.5;
    
    return {
      name: store.name,
      logo: store.logo,
      price: Math.round(price * 100) / 100,
      originalPrice: hasDiscount ? Math.round((price * (1 + Math.random() * 0.3)) * 100) / 100 : undefined,
      url: `https://${store.name.toLowerCase().replace(/[^a-z]/g, '')}.com/search?q=${encodeURIComponent(query)}`,
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      shipping: Math.random() > 0.3 ? "Free Shipping" : `$${(Math.random() * 10 + 5).toFixed(2)} Shipping`,
      verified: Math.random() > 0.2,
    };
  }).sort((a, b) => a.price - b.price);
};

export const ProductResults = ({ query, isLoading }: ProductResultsProps) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query && !isLoading) {
      const data = generateStoreData(query);
      setStores(data);
      setShowResults(true);
    }
  }, [query, isLoading]);

  if (!query) return null;

  if (isLoading) {
    return (
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <p className="text-muted-foreground text-lg">Scanning 12 retailers for best prices...</p>
      </div>
    );
  }

  if (!showResults || stores.length === 0) return null;

  const lowestPrice = stores[0].price;
  const highestPrice = stores[stores.length - 1].price;
  const savings = highestPrice - lowestPrice;

  return (
    <div className="mt-16 animate-slide-up">
      {/* Stats Bar */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <Icon3D icon={Package} size="md" variant="primary" animated={false} />
            <div>
              <p className="text-muted-foreground text-sm">Searching for</p>
              <h2 className="font-display font-bold text-xl text-foreground capitalize">{query}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{stores.length}</p>
                <p className="text-muted-foreground text-sm">Stores</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold gradient-text">${savings.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">Max Savings</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Updated</p>
                <p className="text-foreground font-medium">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Cards */}
      <div className="space-y-4">
        {stores.map((store, index) => (
          <div 
            key={store.name} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <PriceCard
              store={store}
              rank={index + 1}
              lowestPrice={lowestPrice}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductResults;
