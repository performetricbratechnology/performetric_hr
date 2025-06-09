import { Clock4, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import type { PriorityTypes } from "../../types/pdi";
import {
  formatPriorityColor,
  formatPriorityText,
} from "../../lib/utils/formatters";

type GoalsTypes = {
  title: string;
  description: string;
  priority: PriorityTypes;
  progress: number;
  actions: {
    id: string;
    action: string;
    progress: number;
    term: string;
  }[];
}[];

const Goals: GoalsTypes = [
  {
    title: "Liderança",
    description: "Desenvolver habilidades de liderança de equipe",
    priority: "high",
    progress: 45,
    actions: [
      {
        id: "101",
        action: "Curso de Gestão de Equipes",
        progress: 30,
        term: "31-12-2025",
      },
      {
        id: "102",
        action: "Mentoria com gestor sênior",
        progress: 60,
        term: "12-11-2025",
      },
    ],
  },
  {
    title: "React",
    description: "Aprofundar conhecimentos em React e ecossistema",
    priority: "medium",
    progress: 57,
    actions: [
      {
        id: "201",
        action: "Certificação React Advanced",
        progress: 75,
        term: "30-11-2025",
      },
      {
        id: "202",
        action: "Projeto prático com Next.js",
        progress: 40,
        term: "24-10-2025",
      },
    ],
  },
];

export function CurrentGoals() {
  return (
    <div
      className="my-6 space-y-6"
      aria-label="Lista de Metas Atuais"
      role="list"
    >
      {Goals.map((goal) => (
        <Card
          key={goal.title}
          role="listitem"
          aria-label={`Meta de ${goal.title}`}
        >
          <CardHeader>
            <div className="flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
              <CardTitle
                aria-label={goal.title}
                role="heading"
                className="text-slate-900 dark:text-slate-100"
              >
                {goal.title}
              </CardTitle>
              <Badge
                className={formatPriorityColor(goal.priority)}
                role="status"
                aria-atomic="false"
                aria-label={`Prioridade ${formatPriorityText(goal.priority)}`}
              >
                {formatPriorityText(goal.priority)}
              </Badge>
            </div>
            <CardDescription aria-label={goal.description} role="contentinfo">
              {goal.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div
                className="flex justify-between items-center"
                aria-label={`Progresso Geral em ${goal.progress}%`}
                role="contentinfo"
              >
                <p aria-label="Progresso Geral">Progresso Geral</p>
                <span>{goal.progress}%</span>
              </div>
              <Progress
                value={goal.progress}
                className="h-2!"
                aria-label={`${goal.progress}%`}
              />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Ações
            </h3>
            <ul
              className="space-y-2"
              aria-label={`Lista de Ações de ${goal.title}`}
            >
              {goal.actions.map((action) => (
                <li
                  key={action.id}
                  className="space-y-2 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg"
                  aria-label={`Ação de ${action.action}`}
                >
                  <div className="w-full flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
                    <div className="inline-flex items-center gap-2 font-medium">
                      <Clock4 className="max-sm:hidden size-4 text-blue-500" />
                      <p aria-label={action.action}>{action.action}</p>
                    </div>
                    <Badge
                      variant="outline"
                      role="note"
                      aria-label={`Prazo: ${action.term}`}
                    >
                      Prazo: {action.term}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div
                      className="flex justify-between items-center"
                      aria-label={`Progresso Geral em ${action.progress}%`}
                      role="contentinfo"
                    >
                      <p aria-label="Progresso">Progresso</p>
                      <span>{action.progress}%</span>
                    </div>
                    <Progress
                      value={action.progress}
                      className="h-1!"
                      aria-label={`${action.progress}%`}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Button
              type="submit"
              size="sm"
              className="max-sm:w-full"
              aria-label="Adicionar Ação"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Ação
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
