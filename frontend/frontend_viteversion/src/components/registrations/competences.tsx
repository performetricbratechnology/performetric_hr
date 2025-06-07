import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

const competences = [
  {
    id: 1,
    name: "JavaScript",
    category: "Técnica",
    description: "Linguagem de programação",
  },
  {
    id: 2,
    name: "Liderança",
    category: "Comportamental",
    description: "Capacidade de liderar equipes",
  },
  {
    id: 3,
    name: "Comunicação",
    category: "Comportamental",
    description: "Habilidades de comunicação",
  },
  {
    id: 3,
    name: "React",
    category: "Técnica",
    description: "Framework JavaScript",
  },
];

export function Competences() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label=" Cadastrar Nova Competência"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Cadastrar Nova Competência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Competence name input"
                role="label"
              >
                Nome da Competência
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Nome da competência"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Team select"
                role="label"
              >
                Categoria
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent id="category">
                  <SelectItem value="technique">Técnica</SelectItem>
                  <SelectItem value="behavioral">Comportamental</SelectItem>
                  <SelectItem value="leadership">Liderança</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Description input"
                role="label"
              >
                Descrição
              </label>
              <Textarea
                id="description"
                placeholder="Descrição da competência"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:col-span-2"
              aria-label="Adicionar Competência"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Competência
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Competências Cadastradas"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Competências Cadastradas
          </CardTitle>
          <CardDescription
            aria-label={`Total:
            ${
              competences.length > 0 && competences.length < 2
                ? competences.length + " competência"
                : competences.length + " competências"
            }`}
            role="paragraph"
          >
            Total:{" "}
            {competences.length > 0 && competences.length < 2
              ? `${competences.length} competência`
              : `${competences.length} competências`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {competences.map((competence) => (
            <div
              key={competence.id}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex flex-col-reverse sm:flex-col">
                <p className="text-md font-medium" aria-label={competence.name}>
                  {competence.name}
                </p>
                <div>
                  <p
                    className="text-slate-700 dark:text-slate-200"
                    aria-label={competence.description}
                  >
                    {competence.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold my-1">
                  <Badge aria-label={competence.category} role="status">
                    {competence.category}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 max-sm:self-end">
                <Button
                  variant="outline"
                  className="hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900  focus:bg-slate-900 focus:text-slate-100 dark:focus:bg-slate-100 dark:focus:text-slate-900 focus:outline-none"
                >
                  <Edit className="size-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-500 hover:text-red-50 focus:bg-red-500 focus:text-red-50 focus:outline-none"
                  aria-label="Remover"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
