import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Icon3DProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "accent" | "warm" | "glass";
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12 p-2.5",
  md: "w-16 h-16 p-4",
  lg: "w-20 h-20 p-5",
  xl: "w-24 h-24 p-6",
};

const iconSizes = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

const variantClasses = {
  primary: "bg-gradient-to-br from-teal-400 to-teal-600 text-primary-foreground shadow-glow",
  accent: "bg-gradient-to-br from-purple-400 to-purple-500 text-accent-foreground shadow-[0_0_40px_hsla(280,85%,65%,0.3)]",
  warm: "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-[0_0_40px_hsla(35,95%,55%,0.3)]",
  glass: "glass-card text-foreground",
};

export const Icon3D = ({ 
  icon: Icon, 
  size = "md", 
  variant = "primary",
  className,
  animated = true 
}: Icon3DProps) => {
  return (
    <div 
      className={cn(
        "rounded-2xl icon-3d flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        animated && "float-animation",
        className
      )}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.5} />
    </div>
  );
};

export default Icon3D;
