import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function NewGoal() {
  const [competence, setCompetence] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Criar Nova Meta"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Criar Nova Meta
          </CardTitle>
          <CardDescription
            aria-label="Defina uma nova meta de desenvolvimento"
            role="contentinfo"
          >
            Defina uma nova meta de desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="competence"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Competence input"
                role="label"
              >
                Competência
              </label>
              <input
                type="text"
                id="competence"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Ex: Liderança, React, Comunicação"
                value={competence}
                onChange={(e) => setCompetence(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Priority select"
                role="label"
              >
                Prioridade
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent id="priority">
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Description input"
                role="label"
              >
                Descrição
              </label>
              <Textarea
                id="description"
                placeholder="Descreva o objetivo desta meta de desenvolvimento"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:col-span-2"
              aria-label="Criar Meta"
              role="button"
            >
              <Plus className="size-5" />
              Criar Meta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
