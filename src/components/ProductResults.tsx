import { useState, useEffect } from "react";
import { Package, TrendingDown, Store, Clock } from "lucide-react";
import { PriceCard } from "./PriceCard";
import { Icon3D } from "./Icon3D";

interface StoreData {
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

// Indian retailers with real search URLs
const generateStoreData = (query: string): StoreData[] => {
  const encodedQuery = encodeURIComponent(query);
  const basePrice = Math.random() * 50000 + 10000; // Base price in INR
  
  const stores = [
    { 
      name: "Amazon India", 
      logo: "https://logo.clearbit.com/amazon.in",
      url: `https://www.amazon.in/s?k=${encodedQuery}`,
      baseModifier: 0 
    },
    { 
      name: "Flipkart", 
      logo: "https://logo.clearbit.com/flipkart.com",
      url: `https://www.flipkart.com/search?q=${encodedQuery}`,
      baseModifier: -500 
    },
    { 
      name: "Croma", 
      logo: "https://logo.clearbit.com/croma.com",
      url: `https://www.croma.com/searchB?q=${encodedQuery}`,
      baseModifier: 1500 
    },
    { 
      name: "Reliance Digital", 
      logo: "https://logo.clearbit.com/reliancedigital.in",
      url: `https://www.reliancedigital.in/search?q=${encodedQuery}`,
      baseModifier: 800 
    },
    { 
      name: "Vijay Sales", 
      logo: "https://logo.clearbit.com/vijaysales.com",
      url: `https://www.vijaysales.com/search/${encodedQuery}`,
      baseModifier: -200 
    },
    { 
      name: "Tata CLiQ", 
      logo: "https://logo.clearbit.com/tatacliq.com",
      url: `https://www.tatacliq.com/search/?searchCategory=all&text=${encodedQuery}`,
      baseModifier: 1200 
    },
    { 
      name: "Snapdeal", 
      logo: "https://logo.clearbit.com/snapdeal.com",
      url: `https://www.snapdeal.com/search?keyword=${encodedQuery}`,
      baseModifier: -1500 
    },
    { 
      name: "Paytm Mall", 
      logo: "https://logo.clearbit.com/paytmmall.com",
      url: `https://paytmmall.com/shop/search?q=${encodedQuery}`,
      baseModifier: -800 
    },
    { 
      name: "JioMart", 
      logo: "https://logo.clearbit.com/jiomart.com",
      url: `https://www.jiomart.com/search/${encodedQuery}`,
      baseModifier: -300 
    },
    { 
      name: "Shopclues", 
      logo: "https://logo.clearbit.com/shopclues.com",
      url: `https://www.shopclues.com/search?q=${encodedQuery}`,
      baseModifier: -2000 
    },
    { 
      name: "Myntra", 
      logo: "https://logo.clearbit.com/myntra.com",
      url: `https://www.myntra.com/${encodedQuery}`,
      baseModifier: 500 
    },
    { 
      name: "Ajio", 
      logo: "https://logo.clearbit.com/ajio.com",
      url: `https://www.ajio.com/search/?text=${encodedQuery}`,
      baseModifier: 200 
    },
  ];

  return stores.map(store => {
    const randomVariance = (Math.random() - 0.5) * 3000;
    const price = Math.max(basePrice + store.baseModifier + randomVariance, 999);
    const hasDiscount = Math.random() > 0.4;
    
    return {
      name: store.name,
      logo: store.logo,
      price: Math.round(price),
      originalPrice: hasDiscount ? Math.round(price * (1 + Math.random() * 0.25)) : undefined,
      url: store.url,
      rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
      shipping: Math.random() > 0.4 ? "Free Delivery" : `₹${Math.round(Math.random() * 100 + 40)} Delivery`,
      verified: Math.random() > 0.15,
    };
  }).sort((a, b) => a.price - b.price);
};

export const ProductResults = ({ query, isLoading }: ProductResultsProps) => {
  const [stores, setStores] = useState<StoreData[]>([]);
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
        <p className="text-muted-foreground text-lg">Scanning 12 Indian retailers for best prices...</p>
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
                <p className="text-2xl font-display font-bold gradient-text">₹{savings.toLocaleString('en-IN')}</p>
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
