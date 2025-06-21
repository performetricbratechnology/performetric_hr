import {
  Eye,
  MoveRight,
  Target,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Trophy,
  Users,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const cards = [
  {
    label: "Total da Equipe",
    value: 15,
    icon: <Users />,
    color: "text-chart-6",
  },
  {
    label: "Média Geral",
    value: 4.0,
    icon: <Trophy />,
    color: "text-chart-2",
  },
  {
    label: "Gaps Críticos",
    value: 3,
    icon: <TriangleAlert />,
    color: "text-chart-3",
  },
  { label: "PDIs Ativos", value: 8, icon: <Target />, color: "text-chart-9" },
];

const team = [
  {
    id: "1",
    nome: "João Silva",
    role: "Dev Frontend",
    value: { current: "4.2", max: "5" },
  },
  {
    id: "2",
    nome: "Maria Santos",
    role: "UX Designer",
    value: { current: "4.5", max: "5" },
  },
  {
    id: "3",
    nome: "Pedro Costa",
    role: "Dev Backend",
    value: { current: "3.8", max: "5" },
  },
  {
    id: "4",
    nome: "Ana Silva",
    role: "DevOps",
    value: { current: "4", max: "5" },
  },
];

const skillDistribution = [
  { name: "Técnicas", value: 45, color: "var(--chart-6)" },
  { name: "Comportamentais", value: 35, color: "var(--chart-9)" },
  { name: "Liderança", value: 20, color: "var(--chart-2)" },
];

export function Overview() {
  return (
    <div className="my-6 space-y-6">
      <div className="grid max-[420px]:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent
              className="flex max-sm:flex-col-reverse max-[420px]:flex-row! justify-center max-[420px]:justify-between sm:justify-between items-center px-4! py-4! sm:px-6! max-sm:text-center max-[420px]:text-start! gap-2"
              role="region"
              aria-label={card.label}
            >
              <div>
                <p
                  className="text-slate-700 dark:text-slate-300"
                  aria-label={card.label}
                >
                  {card.label}
                </p>
                <p
                  className="font-bold text-2xl"
                  aria-label={card.value.toString()}
                >
                  {card.label === "Média Geral"
                    ? card.value.toFixed(1)
                    : card.value}
                </p>
              </div>
              <span className={`${card.color} *:size-8`}>{card.icon}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-label="Visão da Equipe">
              Visão da Equipe
            </CardTitle>
            <CardDescription
              role="contentinfo"
              aria-label="Performance individual dos colaboradores"
            >
              Performance individual dos colaboradores
            </CardDescription>
          </CardHeader>
          <CardContent
            className="space-y-4"
            role="list"
            aria-label="Lista Membros da Equipe"
          >
            {team.map((t) => (
              <div
                key={t.id}
                className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground border border-card-border rounded-lg"
                role="listitem"
                aria-label="Membro da Equipe"
              >
                <div>
                  <p className="font-medium" aria-label={t.nome}>
                    {t.nome}
                  </p>
                  <p className="text-muted-foreground" aria-label={t.role}>
                    {t.role}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 items-center max-sm:self-end">
                  <p aria-label={`${t.value.current}/${t.value.max}`}>
                    {t.value.current}/{t.value.max}
                  </p>
                  {Number(t.value.current) < 4.0 ? (
                    <TrendingDown className="text-chart-3" />
                  ) : Number(t.value.current) === 4.0 ? (
                    <MoveRight className="text-chart-2" />
                  ) : (
                    <TrendingUp className="text-chart-9" />
                  )}
                  <Button variant="primary" size="icon" aria-label="Visualizar">
                    <Eye className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-label="Distribuição de Competências">
              Distribuição de Competências
            </CardTitle>
            <CardDescription
              role="contentinfo"
              aria-label="Categorias de skills da equipe"
            >
              Categorias de skills da equipe
            </CardDescription>
          </CardHeader>
          <CardContent aria-label="Gráfico" role="img">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
