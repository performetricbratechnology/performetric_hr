import { Moon, Sun } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useTheme } from "../contexts/theme";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2"
          aria-label="Módulo de Cadastro"
        >
          Configurações
        </h1>
        <p
          className="text-slate-600 dark:text-slate-400"
          aria-label="Gerencie usuários, times e competências do sistema"
        >
          Gerencie as configurações e preferências da sua conta.
        </p>
      </div>
      <Card className="max-w-screen-md">
        <CardHeader>
          <CardTitle
            aria-label="Aparência"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Aparência
          </CardTitle>
          <CardDescription
            aria-label="Personalize a aparência da interface."
            role="contentinfo"
          >
            Personalize a aparência da interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
              aria-label="Tema select"
              role="label"
            >
              Tema
            </label>

            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex gap-2 items-center">
                    <Sun className="size-4" />
                    Claro
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex gap-2 items-center">
                    <Moon className="size-4" />
                    Escuro
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Escolha seu tema preferido.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
