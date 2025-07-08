import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "../ui";

const skills = [
  { skill: "JavaScript", current: 4, target: 5 },
  { skill: "React", current: 3, target: 4 },
  { skill: "Liderança", current: 2, target: 4 },
  { skill: "Comunicação", current: 4, target: 5 },
  { skill: "Trabalho em Equipe", current: 5, target: 5 },
  { skill: "Resolução de Problemas", current: 3, target: 4 },
];

export function Skills() {
  return (
    <div className="my-6 grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Radar de Competências">
            Radar de Competências
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Visualização atual vs. meta para cada competência"
          >
            Visualização atual vs. meta para cada competência
          </CardDescription>
        </CardHeader>
        <CardContent aria-label="Gráfico" role="img">
          <ResponsiveContainer
            width="100%"
            height={300}
            className="text-muted mix-blend-plus-darker dark:mix-blend-plus-lighter"
          >
            <RadarChart data={skills}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar
                name="Atual"
                dataKey="current"
                stroke="var(--chart-8)"
                fill="var(--chart-8)"
                fillOpacity={0.3}
              />
              <Radar
                name="Meta"
                dataKey="target"
                stroke="var(--chart-6)"
                fill="var(--chart-6)"
                fillOpacity={0.1}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Detalhamento por Competência">
            Detalhamento por Competência
          </CardTitle>
        </CardHeader>
        <CardContent
          className="grid gap-4"
          aria-label="Lista de competências detalhadas"
          role="list"
        >
          {skills.map((skill) => (
            <div
              key={skill.skill}
              className="space-y-2 max-sm:bg-background max-sm:px-2 max-sm:py-4 max-sm:rounded-lg"
              aria-label={`Detalhes da competência: ${skill.skill}`}
            >
              <div className="w-full flex max-sm:flex-col-reverse justify-between items-start sm:items-center max-sm:gap-2">
                <p className="text-lg font-medium" aria-label={skill.skill}>
                  {skill.skill}
                </p>
                <div className="self-end flex gap-1">
                  <Badge
                    variant="outline"
                    role="status"
                    aria-label={`Meta atual: ${skill.current}/5`}
                  >
                    {skill.current}/5
                  </Badge>
                  <Badge
                    variant="default"
                    role="status"
                    aria-label={`Meta alvo: ${skill.target}/5`}
                  >
                    Meta: {skill.target}/5
                  </Badge>
                </div>
              </div>
              <div
                className="space-y-1"
                aria-label={`Progresso Geral em ${skill.current * 20}%`}
                role="contentinfo"
              >
                <Progress
                  value={skill.current * 20}
                  className="h-1!"
                  aria-label={`${skill.current * 20}%`}
                />
              </div>
              <p
                className="text-muted-foreground"
                aria-label={`Gap: ${skill.target - skill.current} pontos`}
              >
                Gap: {skill.target - skill.current} pontos
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
