import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

const rankingData = [
  { name: "Maria Santos", score: 4.5, position: 1 },
  { name: "João Silva", score: 4.2, position: 2 },
  { name: "Ana Silva", score: 4.0, position: 3 },
  { name: "Pedro Costa", score: 3.8, position: 4 },
  { name: "Carlos Lima", score: 3.5, position: 5 },
];

export function Rankings() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Ranking da Equipe">
            Ranking da Equipe
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Classificação por performance geral"
          >
            Classificação por performance geral
          </CardDescription>
        </CardHeader>
        <CardContent
          className="space-y-4"
          role="list"
          aria-label="Lista Ranking de Equipe"
        >
          {rankingData.map((r) => (
            <div
              key={r.name}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-background text-foreground border border-card-border rounded-lg"
              role="listitem"
              aria-label="Membro da Equipe"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex justify-center items-center size-8 rounded-full text-white font-bold ${
                    r.position === 1 && "bg-amber-500"
                  } ${r.position === 2 && "bg-slate-500"} ${
                    r.position === 3 && "bg-amber-700"
                  } ${r.position > 3 && "bg-muted/60"}`}
                  role="status"
                  aria-label={`${r.position} lugar no ranking`}
                >
                  {r.position}
                </div>
                <div>
                  <p className="font-medium" aria-label={r.name}>
                    {r.name}
                  </p>
                  <p
                    className="text-muted-foreground"
                    aria-label={`Score: ${r.score}`}
                  >
                    Score: {r.score}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {r.position <= 3 && (
                  <Badge aria-label="Top 3" role="status">
                    Top 3
                  </Badge>
                )}
                <Button variant="primary" aria-label="Ver Detalhes">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
