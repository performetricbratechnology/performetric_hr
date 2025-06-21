import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "../ui";

const developmentPlans = [
  {
    employee: "João Silva",
    plans: [
      {
        skill: "Liderança",
        action: "Curso de Gestão de Equipes",
        deadline: "2024-12-31",
        progress: 30,
      },
      {
        skill: "React",
        action: "Certificação React Advanced",
        deadline: "2024-11-30",
        progress: 75,
      },
    ],
  },
  {
    employee: "Pedro Costa",
    plans: [
      {
        skill: "Comunicação",
        action: "Workshop de Apresentações",
        deadline: "2024-12-15",
        progress: 50,
      },
      {
        skill: "DevOps",
        action: "Curso AWS",
        deadline: "2025-01-31",
        progress: 20,
      },
    ],
  },
];

export function PDI() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            role="heading"
            aria-label="Planos de Desenvolvimento Individual (PDI)"
          >
            Planos de Desenvolvimento Individual (PDI)
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Acompanhe o progresso dos PDIs da equipe"
          >
            Acompanhe o progresso dos PDIs da equipe
          </CardDescription>
        </CardHeader>
        <CardContent
          className="space-y-4"
          aria-label="Lista de PDIs"
          role="list"
        >
          {developmentPlans.map((plan) => (
            <div
              key={plan.employee}
              className="border border-border p-4 space-y-4 rounded-lg"
              aria-label={`PDI de ${plan.employee}`}
              role="listitem"
            >
              <h3 className="text-xl font-semibold text-card-foreground">
                {plan.employee}
              </h3>
              <ul
                className="space-y-2"
                aria-label={`Lista de Ações de ${plan.employee}`}
              >
                {plan.plans.map((p) => (
                  <li
                    key={p.skill}
                    className="space-y-2 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg"
                    aria-label={`Ação de ${p.skill}`}
                  >
                    <div className="w-full flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
                      <div>
                        <p className="text-lg font-medium" aria-label={p.skill}>
                          {p.skill}
                        </p>
                        <p
                          className="text-muted-foreground"
                          aria-label={p.action}
                        >
                          {p.action}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        role="note"
                        aria-label={`Prazo: ${p.deadline}`}
                      >
                        Prazo: {p.deadline}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div
                        className="flex justify-between items-center"
                        aria-label={`Progresso Geral em ${p.progress}%`}
                        role="contentinfo"
                      >
                        <p aria-label="Progresso">Progresso</p>
                        <span>{p.progress}%</span>
                      </div>
                      <Progress
                        value={p.progress}
                        className="h-1!"
                        aria-label={`${p.progress}%`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
