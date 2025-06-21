import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import {
  formatPriorityColor,
  formatPriorityText,
} from "@/lib/utils/formatters";
import type { PriorityTypes } from "@/types/pdi";

const skillsGaps = [
  { skill: "Liderança", gap: 2.3, priority: "high" },
  { skill: "React", gap: 1.8, priority: "medium" },
  { skill: "Comunicação", gap: 1.5, priority: "medium" },
  { skill: "DevOps", gap: 2.1, priority: "high" },
  { skill: "Testes", gap: 1.2, priority: "low" },
];

export function Gaps() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Gaps de Competências">
            Gaps de Competências
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Principais lacunas identificadas na equipe"
          >
            Principais lacunas identificadas na equipe
          </CardDescription>
        </CardHeader>
        <CardContent aria-label="Gráfico" role="img">
          <ResponsiveContainer
            width="100%"
            height={300}
            className="text-muted mix-blend-plus-darker dark:mix-blend-plus-lighter"
          >
            <BarChart data={skillsGaps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="gap" fill="var(--chart-6)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Detalhamento dos Gaps">
            Detalhamento dos Gaps
          </CardTitle>
        </CardHeader>
        <CardContent
          className="space-y-4"
          role="list"
          aria-label="Lista Gaps Detalhados"
        >
          {skillsGaps.map((skill) => (
            <div
              key={skill.skill}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground border border-card-border rounded-lg"
              role="listitem"
              aria-label="Gap"
            >
              <div>
                <p className="font-medium" aria-label={skill.skill}>
                  {skill.skill}
                </p>
                <p
                  className="text-muted-foreground"
                  aria-label={`Gap médio: ${skill.gap} pontos`}
                >
                  Gap médio: {skill.gap} pontos
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className={formatPriorityColor(
                    skill.priority as PriorityTypes
                  )}
                  aria-label={`Prioridade ${formatPriorityText(
                    skill.priority as PriorityTypes
                  )}`}
                  role="status"
                >
                  {formatPriorityText(skill.priority as PriorityTypes)}
                </Badge>
                <Button variant="primary" aria-label="Criar PDI">
                  Criar PDI
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
