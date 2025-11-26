import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskColumn } from "@/components/TaskColumn";
import { FocusMode } from "@/components/FocusMode";
import { TaskDetails } from "@/components/TaskDetails";
import { BottomNav } from "@/components/BottomNav";
import { Task, Priority, Status } from "@/components/TaskCard";
import { useToast } from "@/hooks/use-toast";
import Timer from "./Timer";
import Categories from "./Categories";
import Settings from "./Settings";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<string>("tasks");
  const { toast } = useToast();

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const addTask = (title: string, priority: Priority, reminder?: string, description?: string, estimatedTime?: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      priority,
      status: "todo",
      reminder,
      description,
      estimatedTime,
    };

    setTasks([newTask, ...tasks]);
    
    toast({
      title: "✅ Tarefa adicionada!",
      description: `"${title}" foi adicionada com prioridade ${priority === "high" ? "alta" : priority === "medium" ? "média" : "baixa"}.`,
    });

    // Schedule reminder notification
    if (reminder) {
      scheduleReminder(newTask);
    }
  };

  const scheduleReminder = (task: Task) => {
    if (!task.reminder || !("Notification" in window)) return;

    const [hours, minutes] = task.reminder.split(":").map(Number);
    const now = new Date();
    const reminderTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    // If time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("⏰ Lembrete de Tarefa!", {
          body: task.title,
          icon: "/favicon.ico",
        });
      }
      
      toast({
        title: "⏰ Lembrete!",
        description: task.title,
      });
    }, timeUntilReminder);
  };

  const moveTask = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const nextStatus: Record<Status, Status> = {
            todo: "progress",
            progress: "done",
            done: "todo",
          };
          const newStatus = nextStatus[task.status];
          
          const statusLabels = {
            todo: "A Fazer",
            progress: "Em Progresso",
            done: "Concluído",
          };
          
          toast({
            title: "📋 Tarefa movida!",
            description: `"${task.title}" foi movida para ${statusLabels[newStatus]}.`,
          });
          
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
    }
    if (task) {
      toast({
        title: "🗑️ Tarefa excluída",
        description: `"${task.title}" foi removida.`,
        variant: "destructive",
      });
    }
  };

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "done" as Status } : task
    );
    setTasks(updatedTasks);
    toast({
      title: "Tarefa concluída! 🎉",
      description: "Parabéns por completar esta tarefa!",
    });
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId) || null;

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const focusedTask = tasks.find((t) => t.id === focusedTaskId);

  // Render different views
  if (currentView === "timer") {
    return (
      <>
        <Timer />
        <BottomNav currentView={currentView} onViewChange={setCurrentView} />
      </>
    );
  }

  if (currentView === "categories") {
    return (
      <>
        <Categories />
        <BottomNav currentView={currentView} onViewChange={setCurrentView} />
      </>
    );
  }

  if (currentView === "settings") {
    return (
      <>
        <Settings />
        <BottomNav currentView={currentView} onViewChange={setCurrentView} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background pb-24">
        <TaskDetails
          task={selectedTask}
          isOpen={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onMove={moveTask}
          onComplete={completeTask}
        />

        {/* Header */}
        <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center">
              Gestor de Tarefas TDAH
            </h1>
            <p className="text-center text-lg mt-2 opacity-90">
              Foco, clareza e organização para o seu dia
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Add Task Form */}
        <AddTaskForm onAdd={addTask} />

        {/* Focus Mode Toggle */}
        {(todoTasks.length > 0 || progressTasks.length > 0) && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const firstTask = todoTasks[0] || progressTasks[0];
                setFocusedTaskId(firstTask.id);
              }}
              className="gap-3 text-lg h-14 font-bold border-2"
            >
              <Eye className="h-6 w-6" />
              Entrar no Modo Foco
            </Button>
          </div>
        )}

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="A Fazer"
              status="todo"
              tasks={todoTasks}
              onMove={moveTask}
              onDelete={deleteTask}
              onViewDetails={setSelectedTaskId}
              focusedTaskId={focusedTaskId || undefined}
            />
            <TaskColumn
              title="Em Progresso"
              status="progress"
              tasks={progressTasks}
              onMove={moveTask}
              onDelete={deleteTask}
              onViewDetails={setSelectedTaskId}
            />
            <TaskColumn
              title="Concluído"
              status="done"
              tasks={doneTasks}
              onMove={moveTask}
              onDelete={deleteTask}
              onViewDetails={setSelectedTaskId}
            />
          </div>
        </main>

        {/* Focus Mode Overlay */}
        {focusedTask && (
          <FocusMode
            task={focusedTask}
            onClose={() => setFocusedTaskId(null)}
            onMove={moveTask}
            onDelete={deleteTask}
          />
        )}

        <BottomNav currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </>
  );
};

export default Index;
