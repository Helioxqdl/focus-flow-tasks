import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Rotina", color: "bg-blue-500" },
    { id: "2", name: "Remédios", color: "bg-green-500" },
    { id: "3", name: "Estudos", color: "bg-purple-500" },
    { id: "4", name: "Trabalho", color: "bg-orange-500" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  const addCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "⚠️ Campo vazio",
        description: "Digite um nome para a categoria.",
        variant: "destructive",
      });
      return;
    }

    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.trim(),
      color: randomColor,
    };

    setCategories([...categories, category]);
    setNewCategory("");
    
    toast({
      title: "✅ Categoria criada!",
      description: `"${category.name}" foi adicionada.`,
    });
  };

  const deleteCategory = (id: string) => {
    const category = categories.find((c) => c.id === id);
    setCategories(categories.filter((c) => c.id !== id));
    
    if (category) {
      toast({
        title: "🗑️ Categoria excluída",
        description: `"${category.name}" foi removida.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">
            📁 Categorias Personalizadas
          </h1>
          <p className="text-center text-lg mt-2 opacity-90">
            Organize suas tarefas em categorias customizadas
          </p>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">➕ Nova Categoria</h2>
          <div className="flex gap-3">
            <Input
              placeholder="Nome da categoria (ex: Rotina, Estudos...)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCategory()}
              className="text-lg h-12"
            />
            <Button
              onClick={addCategory}
              size="lg"
              className="gap-2 h-12 px-6"
            >
              <Plus className="h-5 w-5" />
              Adicionar
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">📋 Minhas Categorias</h2>
          
          {categories.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg py-8">
              Nenhuma categoria criada ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between bg-background border-2 border-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${category.color}`} />
                    <span className="text-lg font-semibold">{category.name}</span>
                  </div>
                  
                  <Button
                    onClick={() => deleteCategory(category.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
