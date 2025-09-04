import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  onClick, 
  variant = "primary",
  className 
}: DashboardCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-primary/20 hover:border-primary/40 hover:shadow-[var(--shadow-government)]";
      case "secondary":
        return "border-secondary/20 hover:border-secondary/40";
      case "accent":
        return "border-accent/20 hover:border-accent/40";
      default:
        return "border-border hover:border-primary/30";
    }
  };

  return (
    <div 
      className={cn(
        "government-card p-6 cursor-pointer group transition-all duration-300 hover:scale-[1.02]",
        getVariantStyles(),
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className={cn(
          "p-3 rounded-lg transition-colors",
          variant === "primary" && "bg-primary/10 group-hover:bg-primary/20",
          variant === "secondary" && "bg-secondary/10 group-hover:bg-secondary/20",
          variant === "accent" && "bg-accent/10 group-hover:bg-accent/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            variant === "primary" && "text-primary",
            variant === "secondary" && "text-secondary",
            variant === "accent" && "text-accent"
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-3 px-0 h-auto text-primary hover:text-primary-glow"
          >
            Learn More →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;