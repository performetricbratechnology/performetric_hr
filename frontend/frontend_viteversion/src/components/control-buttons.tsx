import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Sheet,
  SheetTrigger,
} from "./ui";
import { useState } from "react";
import { ControlUsers } from "./control/control-users";
import type { ControlProps } from "@/types/registrations";

export function ControlButtons({ tab }: ControlProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 max-sm:self-end">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="primary" onClick={() => setOpen(true)}>
            <Edit className="size-4" />
            Editar
          </Button>
        </SheetTrigger>
        {tab === "users" && <ControlUsers />}
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="icon" aria-label="Remover">
            <Trash className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente
              esse item de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
