import { ShoppingCart, TrendingDown, Zap, Shield, BarChart3, Gift } from "lucide-react";
import { Icon3D } from "./Icon3D";

export const HeroSection = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating 3D Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[15%] float-animation">
          <Icon3D icon={ShoppingCart} size="lg" variant="primary" />
        </div>
        <div className="absolute top-40 right-[12%] float-animation-delayed">
          <Icon3D icon={TrendingDown} size="md" variant="accent" />
        </div>
        <div className="absolute bottom-32 left-[20%] float-animation">
          <Icon3D icon={Gift} size="md" variant="warm" />
        </div>
        <div className="absolute bottom-20 right-[18%] float-animation-delayed">
          <Icon3D icon={BarChart3} size="lg" variant="glass" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Compare prices across 12+ Indian retailers</span>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-6 animate-slide-up-delay-1">
          Find the{" "}
          <span className="gradient-text">Best Deals</span>
          <br />
          in India
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up-delay-2">
          Stop wasting time checking Amazon, Flipkart, Croma separately. We scan all major 
          Indian retailers and show you the lowest prices in INR.
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-8 flex-wrap animate-slide-up-delay-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm">Trusted Retailers</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm">Real-time Prices</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingDown className="w-5 h-5 text-primary" />
            <span className="text-sm">Save in ₹</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
