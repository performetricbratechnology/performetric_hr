import { Edit, Trash } from "lucide-react";
import { Button } from "./ui";

export function ControlButtons() {
  return (
    <div className="flex gap-2 max-sm:self-end">
      <Button variant="primary">
        <Edit className="size-4" />
        Editar
      </Button>
      <Button variant="secondary" size="icon" aria-label="Remover">
        <Trash className="size-4" />
      </Button>
    </div>
  );
}
