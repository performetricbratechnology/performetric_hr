import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useFetch from "@/lib/hooks/useFetch";
import {
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "../ui";
import { UsersList } from "../home/users-list";
import { TEAMS_GET, USER_POST } from "@/api";
import type { TProps } from "@/types/registrations";

export function Users() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [teams, setTeams] = useState<TProps[]>([]);
  const { request, error } = useFetch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = {
      FullName: name,
      Email: email,
      Position: role,
      Team: team,
    };
    const { url, options } = USER_POST(body);
    const { response } = await request(url, options);

    if (!response?.ok) alert(error || "Erro ao cadastrar usuário.");

    alert("Usuário cadastrado com sucesso!");
    setName("");
    setEmail("");
    setRole("");
    setTeam("");
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = TEAMS_GET();
      const response = await fetch(url, options);

      if (!response?.ok) return;
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle aria-label="Cadastrar Novo Usuário" role="heading">
            Cadastrar Novo Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name" aria-label="Name input">
                {" "}
                Nome
              </Label>
              <Input
                type="text"
                id="name"
                name="FullName"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" aria-label="Email input">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="Email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" aria-label="Role input">
                Cargo
              </Label>
              <Input
                type="text"
                id="role"
                name="Position"
                placeholder="Cargo/Função"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team" aria-label="Team select">
                Time
              </Label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Selecione um time" />
                </SelectTrigger>
                <SelectContent>
                  {teams.length > 0 &&
                    teams.map((t) => (
                      <SelectItem key={t.id} value={t.team_name}>
                        {t.team_name}
                      </SelectItem>
                    ))}
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
      <UsersList />
    </div>
  );
}
