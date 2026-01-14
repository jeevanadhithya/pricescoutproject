import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from "lucide-react";
import { Icon3D } from "./Icon3D";
import { cn } from "@/lib/utils";

const categories = [
  { icon: Smartphone, name: "Phones", variant: "primary" as const },
  { icon: Laptop, name: "Laptops", variant: "accent" as const },
  { icon: Headphones, name: "Audio", variant: "warm" as const },
  { icon: Watch, name: "Watches", variant: "primary" as const },
  { icon: Camera, name: "Cameras", variant: "accent" as const },
  { icon: Gamepad2, name: "Gaming", variant: "warm" as const },
];

interface FeaturedCategoriesProps {
  onCategoryClick: (category: string) => void;
}

export const FeaturedCategories = ({ onCategoryClick }: FeaturedCategoriesProps) => {
  return (
    <section className="py-10 md:py-16 px-4 md:px-0">
      <h2 className="font-display font-bold text-xl md:text-2xl text-center text-foreground mb-6 md:mb-10">
        Popular Categories
      </h2>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={cn(
              "group flex flex-col items-center gap-2 md:gap-4 p-3 md:p-6 rounded-xl md:rounded-2xl",
              "glass-card border border-transparent",
              "hover:border-primary/30 hover:scale-105",
              "transition-all duration-300",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="hidden md:block">
              <Icon3D 
                icon={category.icon} 
                size="lg" 
                variant={category.variant}
                animated={false}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className={cn(
              "md:hidden w-12 h-12 rounded-xl flex items-center justify-center",
              "transition-all duration-300 group-hover:scale-110",
              category.variant === "primary" && "bg-gradient-to-br from-teal-400 to-teal-600 shadow-glow",
              category.variant === "accent" && "bg-gradient-to-br from-purple-400 to-purple-500 shadow-[0_0_40px_hsla(280,85%,65%,0.3)]",
              category.variant === "warm" && "bg-gradient-to-br from-orange-400 to-orange-500 shadow-[0_0_40px_hsla(35,95%,55%,0.3)]"
            )}>
              <category.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span className="font-medium text-xs md:text-base text-foreground group-hover:text-primary transition-colors text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
