import { X, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task, Priority } from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskDetailsProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onMove: (taskId: string) => void;
  onComplete: (taskId: string) => void;
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

export function TaskDetails({ task, isOpen, onClose, onMove, onComplete }: TaskDetailsProps) {
  if (!task) return null;

  const canComplete = task.status === "progress";
  const canStart = task.status === "todo";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b-2 border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-2xl font-bold mb-2">
                {task.title}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Detalhes da tarefa
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <Badge
            variant="outline"
            className={cn(
              "w-fit border-2 font-bold text-sm px-3 py-1.5",
              priorityConfig[task.priority].className
            )}
          >
            {priorityConfig[task.priority].label}
          </Badge>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {task.description || "Sem descrição"}
            </p>
          </div>

          {/* Estimated Time */}
          {task.estimatedTime && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Tempo Estimado</h3>
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{task.estimatedTime} minutos</span>
              </div>
            </div>
          )}

          {/* Reminder */}
          {task.reminder && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Lembrete</h3>
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{task.reminder}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-4 border-t-2 border-border space-y-3">
          {canStart && (
            <Button
              size="lg"
              className="w-full text-lg h-14 font-bold gap-3"
              onClick={() => {
                onMove(task.id);
                onClose();
              }}
            >
              <ChevronRight className="h-6 w-6" />
              Iniciar Tarefa
            </Button>
          )}
          
          {canComplete && (
            <Button
              size="lg"
              className="w-full text-lg h-14 font-bold gap-3 bg-status-done hover:bg-status-done/90"
              onClick={() => {
                onComplete(task.id);
                onClose();
              }}
            >
              <CheckCircle className="h-6 w-6" />
              Concluir Tarefa
            </Button>
          )}

          {task.status === "done" && (
            <div className="text-center text-muted-foreground py-4">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-status-done" />
              <p className="font-semibold">Tarefa concluída! 🎉</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
