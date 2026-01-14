import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className={cn(
            "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-teal-400 to-teal-600",
            "transition-all duration-300 group-hover:shadow-glow group-hover:scale-105"
          )}>
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl text-foreground">
            Price<span className="gradient-text">Scout</span>
          </span>
        </a>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-border/50 py-4 px-4 flex flex-col gap-4">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
            How it Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
            Categories
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
            Price Alerts
          </a>
          <a 
            href="#" 
            className={cn(
              "px-5 py-3 rounded-xl font-semibold text-center",
              "bg-gradient-to-r from-teal-400 to-teal-600 text-primary-foreground",
              "hover:shadow-glow transition-all duration-300"
            )}
          >
            Sign Up
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
