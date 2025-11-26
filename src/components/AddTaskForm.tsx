import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "./TaskCard";

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority, reminder?: string, description?: string, estimatedTime?: number) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [reminder, setReminder] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(
        title, 
        priority, 
        reminder || undefined,
        description || undefined,
        estimatedTime ? parseInt(estimatedTime) : undefined
      );
      setTitle("");
      setPriority("medium");
      setReminder("");
      setDescription("");
      setEstimatedTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
      <div className="space-y-5">
        {/* Task Input */}
        <div>
          <Label htmlFor="task-title" className="text-base font-semibold mb-2 block">
            Nova Tarefa
          </Label>
          <Input
            id="task-title"
            type="text"
            placeholder="Digite sua tarefa..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg h-14 border-2"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-base font-semibold mb-2 block">
            Descrição (opcional)
          </Label>
          <Input
            id="description"
            type="text"
            placeholder="Detalhes sobre a tarefa..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-base h-12 border-2"
          />
        </div>

        {/* Priority and Estimated Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priority" className="text-base font-semibold mb-2 block">
              Prioridade
            </Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
              <SelectTrigger id="priority" className="text-base h-12 border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high" className="text-base">
                  🔴 Alta
                </SelectItem>
                <SelectItem value="medium" className="text-base">
                  🟡 Média
                </SelectItem>
                <SelectItem value="low" className="text-base">
                  🟢 Baixa
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="estimatedTime" className="text-base font-semibold mb-2 block">
              Tempo estimado (min)
            </Label>
            <Input
              id="estimatedTime"
              type="number"
              placeholder="Ex: 30"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="text-base h-12 border-2"
              min="1"
            />
          </div>
        </div>

        {/* Reminder */}
        <div>
          <Label htmlFor="reminder" className="text-base font-semibold mb-2 block">
            Lembrete (opcional)
          </Label>
          <Input
            id="reminder"
            type="time"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="text-base h-12 border-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full text-lg h-14 font-bold gap-3"
        >
          <Plus className="h-6 w-6" />
          Adicionar Tarefa
        </Button>
      </div>
    </form>
  );
}
