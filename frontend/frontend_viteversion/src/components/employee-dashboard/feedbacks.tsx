import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Description,
} from "../ui";

const feedbacks = [
  {
    id: 1,
    from: "Maria Santos (Gestora)",
    skill: "JavaScript",
    rating: 4,
    comment:
      "Excelente evolução técnica. Continue praticando frameworks modernos.",
    date: "2024-11-15",
  },
  {
    id: 2,
    from: "Pedro Costa (Colega)",
    skill: "Comunicação",
    rating: 4,
    comment:
      "Muito boa comunicação em reuniões. Poderia participar mais de apresentações.",
    date: "2024-11-10",
  },
  {
    id: 3,
    from: "Ana Silva (Colega)",
    skill: "Trabalho em Equipe",
    rating: 5,
    comment: "Sempre disposto a ajudar a equipe. Excelente colaboração.",
    date: "2024-11-08",
  },
];

export function Feedbacks() {
  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading" aria-label="Feedbacks Recebidos">
            Feedbacks Recebidos
          </CardTitle>
          <CardDescription
            role="contentinfo"
            aria-label="Comentários e avaliações de colegas e gestores"
          >
            Comentários e avaliações de colegas e gestores
          </CardDescription>
        </CardHeader>
        <CardContent
          className="space-y-4"
          role="list"
          aria-label="Lista de Feedbacks Recebidos"
        >
          {feedbacks.map((feedback) => (
            <div
              className="flex flex-col gap-4 p-3 bg-background text-foreground border border-card-border rounded-lg max-sm:text-center"
              role="listitem"
              aria-label={`Feedback de: ${feedback.from}`}
            >
              <div className="w-full flex max-sm:flex-col-reverse sm:justify-between items-center gap-2">
                <div className="flex flex-col-reverse sm:flex-col">
                  <p aria-label={feedback.from}>{feedback.from}</p>
                  <span
                    className="text-sm text-muted-foreground"
                    role="note"
                    aria-label={feedback.date}
                  >
                    {feedback.date}
                  </span>
                </div>
                <div className="flex max-sm:flex-col max-sm:items-center gap-2">
                  <Badge
                    variant="secondary"
                    role="status"
                    aria-label={feedback.skill}
                  >
                    {feedback.skill}
                  </Badge>
                  <div
                    className="flex"
                    role="note"
                    aria-label={`${feedback.rating}/5 estrelas`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < feedback.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Description aria={feedback.comment}>
                {feedback.comment}
              </Description>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
