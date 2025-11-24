import { X, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "./TaskCard";
import { cn } from "@/lib/utils";

interface FocusModeProps {
  task: Task;
  onClose: () => void;
  onMove: (taskId: string) => void;
  onDelete: (taskId: string) => void;
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

const statusLabels = {
  todo: "A Fazer",
  progress: "Em Progresso",
  done: "Concluído",
};

export function FocusMode({ task, onClose, onMove, onDelete }: FocusModeProps) {
  return (
    <div className="fixed inset-0 z-50 bg-focus-overlay/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-3xl border-4 border-primary p-10 max-w-2xl w-full shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-card-foreground mb-3">
              Modo Foco
            </h2>
            <p className="text-lg text-muted-foreground">
              Concentre-se em uma tarefa por vez
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-12 w-12"
          >
            <X className="h-8 w-8" />
          </Button>
        </div>

        {/* Task Details */}
        <div className="space-y-6">
          {/* Priority */}
          <Badge
            variant="outline"
            className={cn(
              "border-2 font-bold text-base px-4 py-2",
              priorityConfig[task.priority].className
            )}
          >
            Prioridade: {priorityConfig[task.priority].label}
          </Badge>

          {/* Title */}
          <h3 className="text-3xl font-bold text-card-foreground leading-tight">
            {task.title}
          </h3>

          {/* Status */}
          <div className="text-xl text-muted-foreground">
            Status: <span className="font-semibold">{statusLabels[task.status]}</span>
          </div>

          {/* Reminder */}
          {task.reminder && (
            <div className="bg-muted rounded-xl p-4 text-lg">
              <span className="font-semibold">Lembrete:</span> {task.reminder}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                onMove(task.id);
                onClose();
              }}
              className="flex-1 text-lg h-16 font-bold gap-3"
            >
              <ChevronRight className="h-6 w-6" />
              Mover para próxima etapa
            </Button>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
              className="h-16 w-16"
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
