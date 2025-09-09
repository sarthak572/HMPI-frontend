import { useState } from "react";
import { Calculator, Map, Database, FileText, BookOpen, Settings, ChevronDown, ChevronRight, Home, BarChart3, Layers, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface SidebarItem {
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: SidebarItem[];
  active?: boolean;
}
const sidebarItems: SidebarItem[] = [{
  title: "Dashboard",
  icon: Home,
  href: "/",
  active: true
}, {
  title: "HMPI Calculator",
  icon: Calculator,
  children: [{
    title: "New Calculation",
    icon: Calculator,
    href: "/calculator/new"
  }, {
    title: "Batch Processing",
    icon: Database,
    href: "/calculator/batch"
  }, {
    title: "Historical Data",
    icon: BarChart3,
    href: "/calculator/history"
  }]
}, {
  title: "Interactive Maps",
  icon: Map,
  children: [{
    title: "Pollution Overview",
    icon: Layers,
    href: "/maps/overview"
  }, {
    title: "Regional Analysis",
    icon: Filter,
    href: "/maps/regional"
  }, {
    title: "Temporal Trends",
    icon: BarChart3,
    href: "/maps/trends"
  }]
}, {
  title: "Data Repository",
  icon: Database,
  href: "/data"
}, {
  title: "Reports & Analytics",
  icon: FileText,
  children: [{
    title: "Generate Reports",
    icon: FileText,
    href: "/reports/generate"
  }, {
    title: "Export Data",
    icon: Database,
    href: "/reports/export"
  }, {
    title: "Statistics",
    icon: BarChart3,
    href: "/reports/stats"
  }]
}, {
  title: "User Guide",
  icon: BookOpen,
  href: "/guide"
}, {
  title: "Settings",
  icon: Settings,
  href: "/settings"
}];
interface SidebarProps {
  className?: string;
}
const Sidebar = ({
  className
}: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["HMPI Calculator"]);
  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]);
  };
  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const Icon = item.icon;
    return <div key={item.title} className="w-full">
        <Button variant={item.active ? "secondary" : "ghost"} className={cn("w-full justify-start text-left h-auto py-3 px-4", level > 0 && "ml-4 pl-8", item.active && "bg-accent/10 text-accent border-l-4 border-accent")} onClick={() => hasChildren ? toggleExpanded(item.title) : undefined}>
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{item.title}</span>
          {hasChildren && (isExpanded ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />)}
        </Button>

        {hasChildren && isExpanded && <div className="mt-1 space-y-1">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>}
      </div>;
  };
  return <aside className={cn("w-80 bg-card border-r border-border h-full overflow-y-auto", className)}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Navigation</h2>
        
        {/* Quick Stats */}
        

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Version 2.1.0</p>
            <p>© 2024 HydroVeda</p>
            <p>Government of India</p>
          </div>
        </div>
      </div>
    </aside>;
};
export default Sidebar;