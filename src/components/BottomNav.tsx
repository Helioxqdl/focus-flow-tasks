import { ListTodo, Timer, FolderKanban, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "tasks", label: "Tarefas", icon: ListTodo },
  { id: "timer", label: "Timer", icon: Timer },
  { id: "categories", label: "Categorias", icon: FolderKanban },
  { id: "settings", label: "Config", icon: Settings },
];

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-2xl z-50">
      <div className="flex justify-around items-center h-20 max-w-7xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 flex-1 max-w-[120px]",
                isActive
                  ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className={cn("h-7 w-7", isActive && "animate-pulse-soft")} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
