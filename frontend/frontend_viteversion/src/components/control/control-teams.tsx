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
import type { TeamProps } from "@/types/registrations";
import { useState } from "react";

type Props = {
  onClose: () => void;
  team?: TeamProps;
};

export function ControlTeams({ onClose, team }: Props) {
  const [name, setName] = useState(team?.name);
  const [description, setDescription] = useState(team?.description);

  if (!team) return <div>Time não encontrado.</div>;
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar Time</SheetTitle>
        <SheetDescription>
          Faça alterações no time aqui. Clique em "Salvar" quando terminar.
        </SheetDescription>
      </SheetHeader>
      <form className="flex flex-col flex-1">
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
              placeholder="Equipe de..."
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
