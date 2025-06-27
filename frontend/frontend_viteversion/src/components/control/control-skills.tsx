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
import type { SkillsProps } from "@/types/registrations";
import { useState } from "react";

type Props = {
  onClose: () => void;
  skill?: SkillsProps;
};

export function ControlSkill({ onClose, skill }: Props) {
  const [name, setName] = useState(skill?.name);
  const [description, setDescription] = useState(skill?.description);
  const [category, setCategory] = useState(skill?.category);

  if (!skill) return <div>Competência não encontrada.</div>;
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar Competência</SheetTitle>
        <SheetDescription>
          Faça alterações na competência aqui. Clique em "Salvar" quando
          terminar.
        </SheetDescription>
      </SheetHeader>
      <form className="flex flex-col flex-1">
        <div className="px-4 space-y-4 flex-grow overflow-auto">
          <div className="space-y-2">
            <Label htmlFor="name-edit">Nome da Competência</Label>
            <Input
              type="text"
              id="name-edit"
              placeholder="Proativo, liderança..."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="category-edit"
              aria-label="category select"
              role="label"
            >
              Categoria
            </Label>
            <Select
              value={category}
              onValueChange={(value: string) => setCategory(value)}
            >
              <SelectTrigger id="category-edit">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technique">Técnica</SelectItem>
                <SelectItem value="behavioral">Comportamental</SelectItem>
                <SelectItem value="leadership">Liderança</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description-edit">Descrição</Label>
            <Input
              type="text"
              id="description-edit"
              placeholder="Facilidade em absorver...."
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
