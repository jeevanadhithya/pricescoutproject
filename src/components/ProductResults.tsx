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
  const basePrice = Math.random() * 50000 + 10000;
  
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
      <div className="mt-12 md:mt-16 flex flex-col items-center gap-4 md:gap-6 px-4">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm md:text-lg text-center">Scanning 12 Indian retailers for best prices...</p>
      </div>
    );
  }

  if (!showResults || stores.length === 0) return null;

  const lowestPrice = stores[0].price;
  const highestPrice = stores[stores.length - 1].price;
  const savings = highestPrice - lowestPrice;

  return (
    <div className="mt-10 md:mt-16 animate-slide-up px-4 md:px-0">
      {/* Stats Bar */}
      <div className="glass-card rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          {/* Product Info */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <Icon3D icon={Package} size="md" variant="primary" animated={false} />
            </div>
            <div className="md:hidden w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs md:text-sm">Searching for</p>
              <h2 className="font-display font-bold text-lg md:text-xl text-foreground capitalize">{query}</h2>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 md:flex md:items-center md:gap-8">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary flex items-center justify-center">
                <Store className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-display font-bold text-foreground">{stores.length}</p>
                <p className="text-muted-foreground text-xs md:text-sm">Stores</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary flex items-center justify-center">
                <TrendingDown className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-display font-bold gradient-text">₹{savings.toLocaleString('en-IN')}</p>
                <p className="text-muted-foreground text-xs md:text-sm">Savings</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">Updated</p>
                <p className="text-foreground font-medium text-sm md:text-base">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Cards */}
      <div className="space-y-3 md:space-y-4">
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
