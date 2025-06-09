import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const Recommendations = [
  {
    title: "Comunicação",
    points: 1.5,
    recommended: [
      { id: "101", action: "Workshop de Apresentações Eficazes" },
      { id: "102", action: "Curso de Comunicação Assertiva" },
      { id: "103", action: "Prática de apresentações internas" },
    ],
  },
  {
    title: "DevOps",
    points: 2.1,
    recommended: [
      { id: "201", action: "Certificação AWS Cloud Practitioner" },
      { id: "202", action: "Curso de Docker e Kubernetes" },
      { id: "203", action: "Projeto de CI/CD com GitHub Actions" },
    ],
  },
];

export function Suggestions() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Sugestões Baseadas em Gaps"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Sugestões Baseadas em Gaps
          </CardTitle>
          <CardDescription
            aria-label="Recomendações personalizadas para seu desenvolvimento"
            role="contentinfo"
          >
            Recomendações personalizadas para seu desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent
          role="list"
          aria-label="Lista de Sugestões"
          className="space-y-4"
        >
          {Recommendations.map((rec) => (
            <div
              key={rec.title}
              className="space-y-4 p-2 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-xl"
              role="listitem"
              aria-label={`Sugestões de Ações para ${rec.title}`}
            >
              <div className="flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
                <h3
                  aria-label={rec.title}
                  className="text-lg font-semibold text-slate-900 dark:text-slate-100"
                >
                  {rec.title}
                </h3>
                <Badge
                  variant="destructive"
                  role="status"
                  aria-atomic="false"
                  aria-label={`Gap: ${rec.points} pontos`}
                >
                  Gap: {rec.points} pontos
                </Badge>
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  aria-label="Ações Recomendadas"
                >
                  Ações Recomendadas:
                </p>
                <ul
                  className="space-y-2 mt-2"
                  aria-label="Lista de Ações Recomendadas"
                >
                  {rec.recommended.map((action) => (
                    <li
                      key={action.id}
                      className="flex max-sm:flex-col justify-between sm:items-center gap-3 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-2 rounded-lg max-sm:text-center"
                      aria-label={`Ação: ${action.action}`}
                    >
                      <p aria-label={action.action}>{action.action}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900  focus:bg-slate-900 focus:text-slate-100 dark:focus:bg-slate-100 dark:focus:text-slate-900 
                        focus:outline-none"
                      >
                        Adicionar ao PDI
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
