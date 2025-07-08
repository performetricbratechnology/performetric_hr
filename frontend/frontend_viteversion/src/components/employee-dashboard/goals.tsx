import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "../ui";

const goals = [
  {
    id: 1,
    title: "Melhorar habilidades de liderança",
    progress: 40,
    deadline: "2024-12-31",
  },
  {
    id: 2,
    title: "Certificação React Advanced",
    progress: 75,
    deadline: "2024-11-30",
  },
  {
    id: 3,
    title: "Apresentar projeto para diretoria",
    progress: 20,
    deadline: "2025-01-15",
  },
];

export function Goals() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Minhas Metas">
            Minhas Metas
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Acompanhe o progresso das suas metas de desenvolvimento"
          >
            Acompanhe o progresso das suas metas de desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent
          className="space-y-4"
          aria-label="Lista das Minhas Metas"
          role="list"
        >
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="space-y-2 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg"
              aria-label={`Meta de ${goal.title}`}
              role="listitem"
            >
              <div className="w-full flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
                <p className="text-lg font-medium" aria-label={goal.title}>
                  {goal.title}
                </p>
                <Badge
                  variant="outline"
                  role="note"
                  aria-label={`Prazo: ${goal.deadline}`}
                >
                  Prazo: {goal.deadline}
                </Badge>
              </div>
              <div className="space-y-1">
                <div
                  className="flex justify-between items-center"
                  aria-label={`Progresso Geral em ${goal.progress}%`}
                  role="contentinfo"
                >
                  <p aria-label="Progresso">Progresso</p>
                  <span>{goal.progress}%</span>
                </div>
                <Progress
                  value={goal.progress}
                  className="h-1!"
                  aria-label={`${goal.progress}%`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
