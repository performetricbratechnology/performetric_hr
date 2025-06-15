import { useState } from "react";
import { Users, Star, Send } from "lucide-react";
import {
  Description,
  Title,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/components/ui";

interface Skill {
  id: string;
  nome: string;
  categoria: string;
  avaliacao?: number;
  comentario?: string;
  avaliado: boolean;
}

const skillsIniciais: Skill[] = [
  { id: "1", nome: "JavaScript", categoria: "Técnica", avaliado: false },
  { id: "2", nome: "Liderança", categoria: "Comportamental", avaliado: false },
  {
    id: "3",
    nome: "Comunicação",
    categoria: "Comportamental",
    avaliado: false,
  },
  { id: "4", nome: "React", categoria: "Técnica", avaliado: false },
  {
    id: "5",
    nome: "Trabalho em Equipe",
    categoria: "Comportamental",
    avaliado: false,
  },
];

const colaboradores = [
  { id: "1", nome: "João Silva" },
  { id: "2", nome: "Ana Santos" },
  { id: "3", nome: "Carlos Oliveira" },
  { id: "4", nome: "Maria Costa" },
];

export default function AvaliacoesPage() {
  const [tipoAvaliacao, setTipoAvaliacao] = useState<string>("");
  const [colaboradorSelecionado, setColaboradorSelecionado] =
    useState<string>("");
  const [skills, setSkills] = useState<Skill[]>(skillsIniciais);

  const handleTipoAvaliacaoChange = (tipo: string) => {
    setTipoAvaliacao(tipo);
    setColaboradorSelecionado("");
    // Reset skills when changing evaluation type
    setSkills(
      skillsIniciais.map((skill) => ({
        ...skill,
        avaliacao: undefined,
        comentario: "",
        avaliado: false,
      }))
    );
  };

  const handleAvaliacaoChange = (skillId: string, nota: number) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId
          ? { ...skill, avaliacao: nota, avaliado: true }
          : skill
      )
    );
  };

  const handleComentarioChange = (skillId: string, comentario: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId ? { ...skill, comentario } : skill
      )
    );
  };

  const getProgressColor = (skill: Skill) => {
    if (skill.avaliado) return "bg-green-500";
    return "bg-slate-300";
  };

  const renderStars = (skillId: string, currentRating?: number) => {
    return (
      <div
        className="flex items-center gap-1"
        role="group"
        aria-label="Avaliação"
        aria-atomic
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleAvaliacaoChange(skillId, star)}
            aria-label={star == 1 ? "1 estrela" : star + " estrelas"}
            aria-checked={
              currentRating && star <= currentRating ? "true" : "false"
            }
            role="radio"
          >
            <Star
              className={`h-6 w-6 ${
                currentRating && star <= currentRating
                  ? "fill-orange-400 text-orange-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            />
          </button>
        ))}
        {currentRating && (
          <span className="ml-2 text-sm text-foreground-secondary">
            {currentRating}/5
          </span>
        )}
      </div>
    );
  };

  const showEvaluationForm =
    tipoAvaliacao && (tipoAvaliacao !== "gestor" || colaboradorSelecionado);

  return (
    <div className="container mx-auto py-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <Title>Módulo de Avaliação</Title>
        <Description aria=" Realize avaliações 360°, individuais ou por gestor">
          {" "}
          Realize avaliações 360°, individuais ou por gestor
        </Description>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Configuração e Progresso */}
        <div className="lg:col-span-1 space-y-6">
          {/* Configuração da Avaliação */}
          <Card>
            <CardHeader>
              <CardTitle aria-label="Configuração da Avaliação" role="heading">
                Configuração da Avaliação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="TypeOfAssessment"
                  aria-label="Tipo de Avaliação"
                >
                  Tipo de Avaliação
                </Label>
                <Select
                  value={tipoAvaliacao}
                  onValueChange={handleTipoAvaliacaoChange}
                >
                  <SelectTrigger id="TypeOfAssessment">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="autoavaliacao">Autoavaliação</SelectItem>
                    <SelectItem value="gestor">
                      {" "}
                      Avaliação por Gestor
                    </SelectItem>
                    <SelectItem value="360">Avaliação 360°</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoAvaliacao === "gestor" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="EmployeeToBeEvaluated"
                    aria-label="Colaborador a ser Avaliado"
                  >
                    Colaborador a ser Avaliado
                  </Label>
                  <Select
                    value={colaboradorSelecionado}
                    onValueChange={setColaboradorSelecionado}
                  >
                    <SelectTrigger id="EmployeeToBeEvaluated">
                      <SelectValue placeholder="Selecione o colaborador" />
                    </SelectTrigger>
                    <SelectContent>
                      {colaboradores.map((colaborador) => (
                        <SelectItem key={colaborador.id} value={colaborador.id}>
                          {colaborador.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progresso */}
          {showEvaluationForm && (
            <Card
              role="group"
              aria-label="Progresso card"
              aria-hidden={showEvaluationForm ? "false" : "true"}
              aria-expanded={showEvaluationForm ? "true" : "false"}
            >
              <CardHeader>
                <CardTitle aria-label="Progresso" role="heading">
                  Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="space-y-3"
                  role="list"
                  aria-label="Lista de progresso"
                  aria-atomic
                >
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3"
                      role="listitem"
                      aria-label={`${skill.nome} - ${
                        skill.avaliado ? "ativo" : "inativo"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${getProgressColor(
                          skill
                        )}`}
                        role="status"
                        aria-label={`Status: ${
                          skill.avaliado ? "ativo" : "inativo"
                        }`}
                      />
                      <span
                        className="text-sm font-medium"
                        role="label"
                        aria-label={skill.nome}
                      >
                        {skill.nome}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Área Principal - Avaliação */}
        <div className="lg:col-span-2">
          {!showEvaluationForm ? (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <Users className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3
                  className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  aria-label="Selecione o Tipo de Avaliação"
                >
                  Selecione o Tipo de Avaliação
                </h3>
                <p
                  className="text-slate-400 dark:text-slate-500"
                  aria-label="Escolha o tipo de avaliação para começar"
                  role="note"
                >
                  Escolha o tipo de avaliação para começar
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle
                  aria-label="Avaliação de Competências"
                  role="heading"
                >
                  Avaliação de Competências
                </CardTitle>
                <CardDescription
                  aria-label="Avalie cada competência de 1 a 5 estrelas e adicione
                  comentários opcionais"
                  role="paragraph"
                >
                  Avalie cada competência de 1 a 5 estrelas e adicione
                  comentários opcionais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border-b border-slate-200 dark:border-slate-500 pb-6 last:border-b-0"
                  >
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        {skill.nome}
                      </h4>
                      <Badge
                        variant="default"
                        role="status"
                        aria-label={skill.categoria}
                        aria-atomic="false"
                      >
                        {skill.categoria}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-2"
                        role="label"
                        aria-label="Avaliação (1-5 estrelas)"
                      >
                        Avaliação (1-5 estrelas)
                      </label>
                      {renderStars(skill.id, skill.avaliacao)}
                      {!skill.avaliacao && (
                        <p
                          className="text-sm text-slate-500 dark:text-slate-400 mt-1"
                          aria-label="Não avaliado"
                        >
                          Não avaliado
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={skill.nome + "-comment"}
                        aria-label="Comentários (opcional)"
                      >
                        Comentários (opcional)
                      </Label>
                      <Textarea
                        id={skill.nome + "-comment"}
                        placeholder="Adicione comentários sobre esta competência..."
                        value={skill.comentario || ""}
                        onChange={(e) =>
                          handleComentarioChange(skill.id, e.target.value)
                        }
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!skills.some((skill) => skill.avaliado)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Avaliação
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
