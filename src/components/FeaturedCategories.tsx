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
    <section className="py-16">
      <h2 className="font-display font-bold text-2xl text-center text-foreground mb-10">
        Popular Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={cn(
              "group flex flex-col items-center gap-4 p-6 rounded-2xl",
              "glass-card border border-transparent",
              "hover:border-primary/30 hover:scale-105",
              "transition-all duration-300",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Icon3D 
              icon={category.icon} 
              size="lg" 
              variant={category.variant}
              animated={false}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
