import { TEAMS_GET, MODIFY_NAME, ADD_SKILL } from "@/api";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import type { TProps, UserProps } from "@/types/registrations";
import React, { useEffect, useState } from "react";

type Props = {
  user: UserProps;
  onClose: () => void;
};



export function ControlUsers({ user, onClose }: Props) {
  if (!user) return <div>Usuário não encontrado.</div>;

  const userId = user.id || "";

  const [name, setName] = useState(user.FullName);
  const [role, setRole] = useState(user.Position);
  const [team, setTeam] = useState(user.Team);
  const [skill, setSkill] = useState("");
  const [teams, setTeams] = useState<TProps[]>([]);
  const [email] = useState(user.Email);

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = TEAMS_GET();
      const response = await fetch(url, options);
      if (!response.ok) return;
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const payloadToSend = {
      Id: userId,
      full_name: name,
      Position: role,
      Email: email,
      Team: team,
    };

    console.log("Enviando para backend:", payloadToSend);
    
    const url = `http://localhost:5152/api/EditUser/modify-name?newName=${encodeURIComponent(name)}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadToSend), 
    };
    const res = await fetch(url, options);


    if (!res.ok) throw new Error("Erro ao atualizar usuário");

    if (skill.trim()) {
      const { url: urlSkill, options: optionsSkill } = ADD_SKILL(userId, skill.trim());
      const resSkill = await fetch(urlSkill, optionsSkill);
      if (!resSkill.ok) throw new Error("Erro ao adicionar skill");
    }

    alert("Alterações salvas com sucesso!");
    onClose();
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar alterações.");
  }
};


  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar perfil</SheetTitle>
        <SheetDescription>
          Faça alterações no perfil aqui. Clique em "Salvar" quando terminar.
        </SheetDescription>
      </SheetHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="px-4 space-y-4 flex-grow overflow-auto">
          <div className="space-y-2">
            <Label htmlFor="name-edit">Nome</Label>
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
            <Label htmlFor="role-edit">Cargo</Label>
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
            <Label htmlFor="team-edit">Time</Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger id="team-edit">
                <SelectValue placeholder="Selecione um time" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((t) => (
                  <SelectItem key={t.id} value={t.team_name}>
                    {t.team_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill">Competência</Label>
            <Input
              type="text"
              id="skill"
              placeholder="Nova competência"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" size="sm">
            Salvar Alterações
          </Button>
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Fechar
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
