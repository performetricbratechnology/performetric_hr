import {
  Button,
  Input,
  Label,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import type { TeamProps, TProps } from "@/types/registrations";
import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  team: TeamProps;
};

export function ControlTeams({ onClose, team }: Props) {
  const [name, setName] = useState(team.name);
  const [description, setDescription] = useState(team.description);

  async function updateName(teamId: string, newName: string) {
    const url = `http://localhost:5152/api/EditTeam/modify-name-team?newNameTeam=${encodeURIComponent(newName)}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: teamId,
        teamName: newName,
        teamDescription: description,
      }),
    };
    return fetch(url, options);
  }

  async function updateDescription(teamId: string, newDescription: string) {
    const url = `http://localhost:5152/api/EditTeam/modify-description-team?newDescriptionTeam=${encodeURIComponent(newDescription)}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: teamId,
        teamName: name,
        teamDescription: newDescription,
      }),
    };
    return fetch(url, options);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const teamId = team.id;
      if (!teamId) throw new Error("ID do time é inválido");

      const resName = await updateName(teamId, name);
      if (!resName.ok) throw new Error("Erro ao atualizar nome do time");

      const resDesc = await updateDescription(teamId, description);
      if (!resDesc.ok) throw new Error("Erro ao atualizar descrição do time");

      alert("Time atualizado com sucesso!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar time.");
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar Time</SheetTitle>
        <SheetDescription>
          Faça alterações no time aqui. Clique em "Salvar" quando terminar.
        </SheetDescription>
      </SheetHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="px-4 space-y-4 flex-grow overflow-auto">
          <div className="space-y-2">
            <Label htmlFor="name-edit">Nome do Time</Label>
            <Input
              type="text"
              id="name-edit"
              placeholder="Desenvolvimento, UI/UX"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description-edit">Descrição</Label>
            <Input
              type="text"
              id="description-edit"
              placeholder="Equipe responsável por..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
