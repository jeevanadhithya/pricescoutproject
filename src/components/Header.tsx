import { ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-teal-400 to-teal-600",
            "transition-all duration-300 group-hover:shadow-glow group-hover:scale-105"
          )}>
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Price<span className="gradient-text">Scout</span>
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            How it Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Categories
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Price Alerts
          </a>
          <a 
            href="#" 
            className={cn(
              "px-5 py-2.5 rounded-xl font-semibold",
              "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground",
              "hover:shadow-glow transition-all duration-300 hover:scale-105"
            )}
          >
            Sign Up
          </a>
        </nav>

        {/* Mobile Menu */}
        <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
