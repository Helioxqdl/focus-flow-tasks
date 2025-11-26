import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [fontSize, setFontSize] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedAnimations, setReducedAnimations] = useState(false);
  const [focusTheme, setFocusTheme] = useState(false);
  const { toast } = useToast();

  const handleToggle = (setting: string, value: boolean) => {
    toast({
      title: value ? "✅ Ativado" : "❌ Desativado",
      description: `Configuração "${setting}" foi ${value ? "ativada" : "desativada"}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">
            ⚙️ Configurações de Acessibilidade
          </h1>
          <p className="text-center text-lg mt-2 opacity-90">
            Personalize contraste, fontes e animações
          </p>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="space-y-1">
              <Label htmlFor="font-size" className="text-lg font-semibold">
                🔤 Aumentar tamanho da fonte
              </Label>
              <p className="text-sm text-muted-foreground">
                Torna o texto maior e mais legível
              </p>
            </div>
            <Switch
              id="font-size"
              checked={fontSize}
              onCheckedChange={(checked) => {
                setFontSize(checked);
                handleToggle("Aumentar tamanho da fonte", checked);
                if (checked) {
                  document.documentElement.style.fontSize = "18px";
                } else {
                  document.documentElement.style.fontSize = "";
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="space-y-1">
              <Label htmlFor="high-contrast" className="text-lg font-semibold">
                🎨 Modo de alto contraste
              </Label>
              <p className="text-sm text-muted-foreground">
                Melhora a distinção entre cores
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={(checked) => {
                setHighContrast(checked);
                handleToggle("Modo de alto contraste", checked);
                if (checked) {
                  document.documentElement.classList.add("high-contrast");
                } else {
                  document.documentElement.classList.remove("high-contrast");
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="space-y-1">
              <Label htmlFor="reduced-animations" className="text-lg font-semibold">
                ⚡ Reduzir animações
              </Label>
              <p className="text-sm text-muted-foreground">
                Diminui estímulos visuais e movimento
              </p>
            </div>
            <Switch
              id="reduced-animations"
              checked={reducedAnimations}
              onCheckedChange={(checked) => {
                setReducedAnimations(checked);
                handleToggle("Reduzir animações", checked);
                if (checked) {
                  document.documentElement.classList.add("reduce-motion");
                } else {
                  document.documentElement.classList.remove("reduce-motion");
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="space-y-1">
              <Label htmlFor="focus-theme" className="text-lg font-semibold">
                🎯 Tema Foco
              </Label>
              <p className="text-sm text-muted-foreground">
                Remove cores excessivas para melhor concentração
              </p>
            </div>
            <Switch
              id="focus-theme"
              checked={focusTheme}
              onCheckedChange={(checked) => {
                setFocusTheme(checked);
                handleToggle("Tema Foco", checked);
                if (checked) {
                  document.documentElement.classList.add("focus-theme");
                } else {
                  document.documentElement.classList.remove("focus-theme");
                }
              }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">💡 Sobre Acessibilidade</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Estas configurações foram criadas especialmente para pessoas com TDAH e outras 
            necessidades de acessibilidade. Ajuste-as conforme suas preferências para 
            uma experiência mais confortável e produtiva.
          </p>
        </div>
      </div>
    </div>
  );
}
