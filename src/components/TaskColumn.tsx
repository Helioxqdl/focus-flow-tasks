import { cn } from "@/lib/utils";
import { TaskCard, Task, Status } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onMove: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  focusedTaskId?: string;
}

const statusConfig = {
  todo: {
    bgClass: "bg-status-todo-bg",
    borderClass: "border-status-todo-border",
    textClass: "text-status-todo",
  },
  progress: {
    bgClass: "bg-status-progress-bg",
    borderClass: "border-status-progress-border",
    textClass: "text-status-progress",
  },
  done: {
    bgClass: "bg-status-done-bg",
    borderClass: "border-status-done-border",
    textClass: "text-status-done",
  },
};

export function TaskColumn({
  title,
  status,
  tasks,
  onMove,
  onDelete,
  focusedTaskId,
}: TaskColumnProps) {
  const config = statusConfig[status];
  const count = tasks.length;

  return (
    <div
      className={cn(
        "rounded-2xl border-3 p-6 min-h-[400px] transition-all duration-300",
        config.bgClass,
        config.borderClass
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2
            className={cn(
              "text-2xl font-bold",
              config.textClass
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg border-2",
              config.textClass,
              config.borderClass,
              "bg-card"
            )}
          >
            {count}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-lg">
            Nenhuma tarefa
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
              isFocusMode={focusedTaskId === task.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
