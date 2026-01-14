import { ExternalLink, TrendingDown, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  store: {
    name: string;
    logo: string;
    price: number;
    originalPrice?: number;
    url: string;
    rating: number;
    shipping: string;
    verified: boolean;
  };
  rank: number;
  lowestPrice: number;
}

export const PriceCard = ({ store, rank, lowestPrice }: PriceCardProps) => {
  const isLowest = store.price === lowestPrice;
  const savings = store.originalPrice ? store.originalPrice - store.price : 0;
  const savingsPercent = store.originalPrice 
    ? Math.round((savings / store.originalPrice) * 100) 
    : 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  return (
    <div 
      className={cn(
        "group relative p-4 md:p-5 rounded-2xl transition-all duration-500",
        "hover:scale-[1.01] md:hover:scale-[1.02] hover:-translate-y-1",
        isLowest 
          ? "glass-card border-2 border-primary shadow-glow" 
          : "glass-card border border-border hover:border-primary/50"
      )}
      style={{ animationDelay: `${rank * 0.05}s` }}
    >
      {/* Rank Badge */}
      <div className={cn(
        "absolute -top-2.5 -left-2.5 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center",
        "font-display font-bold text-sm md:text-lg",
        rank === 1 
          ? "bg-gradient-to-br from-teal-400 to-teal-600 text-primary-foreground shadow-glow" 
          : rank === 2 
            ? "bg-gradient-to-br from-purple-400 to-purple-500 text-white"
            : rank === 3
              ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white"
              : "bg-secondary text-foreground"
      )}>
        #{rank}
      </div>

      {/* Lowest Price Badge */}
      {isLowest && (
        <div className="absolute -top-2.5 md:-top-3 right-2 md:right-4 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground text-[10px] md:text-xs font-bold flex items-center gap-1">
          <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3" />
          <span className="hidden sm:inline">LOWEST PRICE</span>
          <span className="sm:hidden">LOWEST</span>
        </div>
      )}

      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 md:hidden pt-2">
        {/* Store Info Row */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center p-1.5 shrink-0">
            <img 
              src={store.logo} 
              alt={store.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${store.name}&background=1a1a2e&color=2dd4bf&bold=true`;
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-semibold text-base text-foreground truncate">
                {store.name}
              </h3>
              {store.verified && (
                <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                <span className="text-xs text-muted-foreground">{store.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground truncate">{store.shipping}</span>
            </div>
          </div>
        </div>

        {/* Price and Button Row */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className={cn(
                "font-display font-bold text-xl",
                isLowest ? "gradient-text" : "text-foreground"
              )}>
                ₹{formatPrice(store.price)}
              </span>
              {store.originalPrice && (
                <span className="text-muted-foreground line-through text-xs">
                  ₹{formatPrice(store.originalPrice)}
                </span>
              )}
            </div>
            {savingsPercent > 0 && (
              <span className="text-xs font-medium text-primary">
                Save {savingsPercent}%
              </span>
            )}
          </div>

          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-sm",
              "transition-all duration-300 shrink-0",
              isLowest
                ? "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground hover:shadow-glow"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            Visit
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {/* Store Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center p-2 shrink-0">
            <img 
              src={store.logo} 
              alt={store.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${store.name}&background=1a1a2e&color=2dd4bf&bold=true`;
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-lg text-foreground truncate">
                {store.name}
              </h3>
              {store.verified && (
                <Shield className="w-4 h-4 text-primary shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="text-sm text-muted-foreground">{store.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{store.shipping}</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="text-right shrink-0">
          <div className="flex items-baseline gap-2 justify-end">
            <span className={cn(
              "font-display font-bold text-2xl",
              isLowest ? "gradient-text" : "text-foreground"
            )}>
              ₹{formatPrice(store.price)}
            </span>
            {store.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ₹{formatPrice(store.originalPrice)}
              </span>
            )}
          </div>
          
          {savingsPercent > 0 && (
            <span className="text-sm font-medium text-primary">
              Save {savingsPercent}%
            </span>
          )}
        </div>

        {/* Visit Button */}
        <a
          href={store.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm",
            "transition-all duration-300 shrink-0",
            isLowest
              ? "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground hover:shadow-glow hover:scale-105"
              : "bg-secondary text-foreground hover:bg-secondary/80 hover:scale-105"
          )}
        >
          Visit Store
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default PriceCard;
