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
import { Badge } from "../ui/badge";

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@empresa.com",
    role: "Desenvolvedor",
    team: "Tech",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@empresa.com",
    role: "Designer",
    team: "UX",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@empresa.com",
    role: "Gerente",
    team: "Tech",
  },
];

export function Users() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Cadastrar Novo Usuário"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Cadastrar Novo Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Name input"
                role="label"
              >
                Nome
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
                htmlFor="email"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Email input"
                role="label"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Role input"
                role="label"
              >
                Cargo
              </label>
              <input
                type="text"
                id="role"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Cargo/Função"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="team"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Team select"
                role="label"
              >
                Time
              </label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Selecione um time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="ux">UX</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="sm:col-span-2"
              aria-label="Adicionar Usuário"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Usuário
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Usuários Cadastrados"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Usuários Cadastrados
          </CardTitle>
          <CardDescription
            aria-label={`Total:
            ${
              users.length > 0 && users.length < 2
                ? users.length + " usuário"
                : users.length + " usuários"
            }`}
            role="paragraph"
          >
            Total:{" "}
            {users.length > 0 && users.length < 2
              ? `${users.length} usuário`
              : `${users.length} usuários`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex flex-col-reverse sm:flex-col">
                <p className="text-md font-medium" aria-label={user.name}>
                  {user.name}
                </p>
                <div>
                  <p
                    className="text-slate-700 dark:text-slate-200"
                    aria-label={user.email}
                  >
                    {user.email}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold my-1">
                  <Badge aria-label={user.role} role="status">
                    {user.role}
                  </Badge>
                  <Badge variant="outline" aria-label={user.team} role="status">
                    {user.team}
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
