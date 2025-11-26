import { GripVertical, Trash2, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  reminder?: string;
  description?: string;
  estimatedTime?: number;
}

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onViewDetails: (taskId: string) => void;
  isFocusMode?: boolean;
}

const priorityConfig = {
  high: {
    label: "Alta",
    className: "bg-priority-high-bg text-priority-high border-priority-high",
  },
  medium: {
    label: "Média",
    className: "bg-priority-medium-bg text-priority-medium border-priority-medium",
  },
  low: {
    label: "Baixa",
    className: "bg-priority-low-bg text-priority-low border-priority-low",
  },
};

export function TaskCard({ task, onMove, onDelete, onViewDetails, isFocusMode }: TaskCardProps) {
  return (
    <div
      onClick={() => onViewDetails(task.id)}
      className={cn(
        "group relative bg-card rounded-xl border-2 border-border p-5 shadow-md transition-all duration-200 cursor-pointer",
        "hover:shadow-xl hover:scale-[1.02] animate-fade-in",
        isFocusMode && "ring-4 ring-primary ring-offset-4"
      )}
    >
      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="pl-6">
        {/* Priority Badge */}
        <Badge
          variant="outline"
          className={cn(
            "mb-3 border-2 font-bold text-sm px-3 py-1",
            priorityConfig[task.priority].className
          )}
        >
          {priorityConfig[task.priority].label}
        </Badge>

        {/* Task Title */}
        <h3 className="text-lg font-semibold text-card-foreground mb-3 leading-tight">
          {task.title}
        </h3>

        {/* Reminder */}
        {task.reminder && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>{task.reminder}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onMove(task.id);
            }}
            className="gap-2 font-semibold"
          >
            <ChevronRight className="h-5 w-5" />
            Mover
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
