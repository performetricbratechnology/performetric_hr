import { TEAMS_GET } from "@/api";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import type { TProps } from "@/types/registrations";
import { useEffect, useState } from "react";

export function ControlUsers() {
  const [name, setName] = useState("nome.exemplo");
  const [role, setRole] = useState("UI/UX Designer");
  const [team, setTeam] = useState("");
  const [teams, setTeams] = useState<TProps[]>([]);

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
    <form>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Faça alterações no perfil aqui. Clique em "Salvar" quando terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name-edit" aria-label="Name input" role="label">
              Nome
            </Label>
            <Input
              type="text"
              id="name-edit"
              placeholder="John, Smith..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-edit" aria-label="Role input" role="label">
              Cargo
            </Label>
            <Input
              type="text"
              id="role-edit"
              placeholder="Developer"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team-edit" aria-label="Team select">
              Time
            </Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger id="team-edit">
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
          <div className="space-y-2">
            <Label htmlFor="skill" aria-label="skill input" role="label">
              Competência
            </Label>
            <Input
              type="text"
              id="skill"
              placeholder="Nova competência"
              required
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" size="sm">
            Salvar Alterações
          </Button>
          <SheetClose asChild>
            <Button variant="outline" size="sm">
              Fechar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </form>
  );
}
