import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      toast({
        title: "🎉 Sessão de foco concluída!",
        description: "Parabéns! Faça uma pausa de 5 minutos.",
      });
      
      // Play notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("⏱️ Timer Finalizado!", {
          body: "Sua sessão de foco foi concluída. Hora de descansar!",
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: "⏱️ Foco iniciado!",
      description: "Concentre-se na sua tarefa pelos próximos 25 minutos.",
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    toast({
      title: "⏸️ Pausado",
      description: "Timer pausado. Clique em play para continuar.",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    toast({
      title: "🔄 Timer reiniciado",
      description: "Timer resetado para 25 minutos.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">
            ⏱️ Cronômetro de Foco
          </h1>
          <p className="text-center text-lg mt-2 opacity-90">
            Técnica Pomodoro para sessões de foco intenso
          </p>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-card rounded-2xl border-2 border-border p-12 text-center shadow-lg">
          <div className="text-8xl font-bold text-primary mb-8">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="gap-2 text-lg h-16 px-8"
              >
                <Play className="h-6 w-6" />
                Iniciar Foco
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="lg"
                variant="secondary"
                className="gap-2 text-lg h-16 px-8"
              >
                <Pause className="h-6 w-6" />
                Pausar
              </Button>
            )}
            
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="gap-2 text-lg h-16 px-8"
            >
              <RotateCcw className="h-6 w-6" />
              Resetar
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">💡 Como usar:</h2>
          <ul className="space-y-3 text-lg text-muted-foreground">
            <li>✅ Escolha uma tarefa para focar</li>
            <li>✅ Inicie o timer de 25 minutos</li>
            <li>✅ Trabalhe com foco total até o timer acabar</li>
            <li>✅ Faça uma pausa de 5 minutos</li>
            <li>✅ Repita o processo!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
