import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

const teams = [
  {
    id: 1,
    name: "Tech",
    members: 15,
    description: "Equipe de Tecnologia",
  },
  {
    id: 2,
    name: "UX",
    members: 8,
    description: "Equipe de Design e UX",
  },
  {
    id: 3,
    name: "Marketing",
    members: 12,
    description: "Equipe de Marketing",
  },
];

export function Teams() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Cadastrar Novo Time"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Cadastrar Novo Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Team name input"
                role="label"
              >
                Nome do Time
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
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
                placeholder="Descrição do time"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              aria-label="Adicionar Time"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Time
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Times Cadastrados"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Times Cadastrados
          </CardTitle>
          <CardDescription
            aria-label={`Total:
            ${
              teams.length > 0 && teams.length < 2
                ? teams.length + " time"
                : teams.length + " times"
            }`}
            role="paragraph"
          >
            Total:{" "}
            {teams.length > 0 && teams.length < 2
              ? `${teams.length} time`
              : `${teams.length} times`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex flex-col-reverse sm:flex-col">
                <p className="text-lg font-medium" aria-label={team.name}>
                  {team.name}
                </p>
                <div>
                  <p
                    className="text-slate-700 dark:text-slate-200"
                    aria-label={team.description}
                  >
                    {team.description}
                  </p>
                </div>
                <div className="flex gap-2 text-xs font-bold my-1">
                  <Badge
                    variant="secondary"
                    aria-label={`
                    ${
                      team.members > 0 && team.members < 2
                        ? team.members + " membro"
                        : team.members + " membros"
                    }`}
                    role="status"
                  >
                    {team.members > 0 && team.members < 2
                      ? `${team.members} membro`
                      : `${team.members} membros`}
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
