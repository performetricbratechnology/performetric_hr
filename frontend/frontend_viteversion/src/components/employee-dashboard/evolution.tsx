import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

const evolutionData = [
  { month: "Jan", javascript: 2, react: 2, lideranca: 1, comunicacao: 3 },
  { month: "Mar", javascript: 3, react: 2, lideranca: 2, comunicacao: 3 },
  { month: "Mai", javascript: 3, react: 3, lideranca: 2, comunicacao: 4 },
  { month: "Jul", javascript: 4, react: 3, lideranca: 2, comunicacao: 4 },
  { month: "Set", javascript: 4, react: 3, lideranca: 2, comunicacao: 4 },
  { month: "Nov", javascript: 4, react: 3, lideranca: 2, comunicacao: 4 },
];

export function Evolution() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Histórico de Evolução">
            Histórico de Evolução
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Acompanhe sua evolução ao longo do tempo"
          >
            Acompanhe sua evolução ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent aria-label="Gráfico" role="img">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="javascript"
                stroke="var(--chart-6)"
                name="JavaScript"
              />
              <Line
                type="monotone"
                dataKey="react"
                stroke="var(--chart-9)"
                name="React"
              />
              <Line
                type="monotone"
                dataKey="lideranca"
                stroke="var(--chart-1)"
                name="Liderança"
              />
              <Line
                type="monotone"
                dataKey="comunicacao"
                stroke="var(--chart-3)"
                name="Comunicação"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-label="Maiores Evoluções">
              Maiores Evoluções
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="flex max-sm:flex-col items-start sm:items-center justify-between gap-1 p-3 bg-chart-9/10 rounded-lg"
              aria-label={`JavaScript | +2 pontos`}
              role="group"
            >
              <span className="font-medium">JavaScript</span>
              <Badge role="status" className="text-chart-9! bg-chart-9/20!">
                +2 pontos
              </Badge>
            </div>
            <div
              className="flex max-sm:flex-col items-start sm:items-center justify-between gap-1 p-3 bg-chart-6/10 rounded-lg"
              aria-label={`Comunicação | +1 ponto`}
              role="group"
            >
              <span className="font-medium">Comunicação</span>
              <Badge role="status" className="text-blue-500! bg-chart-6/20!">
                +1 ponto
              </Badge>
            </div>
            <div
              className="flex max-sm:flex-col items-start sm:items-center justify-between gap-1 p-3 bg-chart-2/10 rounded-lg"
              aria-label={`Liderança | +1 ponto`}
              role="group"
            >
              <span className="font-medium">Liderança</span>
              <Badge role="status" className="text-chart-2! bg-chart-2/20!">
                +1 ponto
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-label="Áreas de Foco">
              Áreas de Foco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-3 border-l-4 border-chart-3  bg-chart-2/10"
              aria-label={`Liderança | Gap de 2 pontos`}
              role="group"
            >
              <h4 className="font-medium">Liderança</h4>
              <p
                className="text-sm text-muted-foreground"
                aria-label="Gap de 2 pontos para a meta"
              >
                Gap de 2 pontos para a meta
              </p>
            </div>
            <div
              className="p-3 border-l-4 border-chart-6 bg-chart-6/10"
              aria-label={`React | Gap de 1 ponto`}
            >
              <h4 className="font-medium">React</h4>
              <p
                className="text-sm text-muted-foreground"
                aria-label="Gap de 1 ponto para a meta"
              >
                Gap de 1 ponto para a meta
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
