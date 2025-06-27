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
  SheetContent,
} from "./ui";
import { useState } from "react";
import { ControlUsers } from "./control/control-users";
import type { UserProps, ControlTypes } from "@/types/registrations";

type Props = {
  tab: ControlTypes;
  user: UserProps;
};

export function ControlButtons({ tab, user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 max-sm:self-end">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="primary">
            <Edit className="size-4" />
            Editar
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          {/* Renderize apenas se user existir */}
          {tab === "users" && user ? (
            <ControlUsers user={user} onClose={() => setOpen(false)} />
          ) : (
            <div className="p-4 text-center text-slate-500">Nenhum usuário selecionado.</div>
          )}
        </SheetContent>
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
              Esta ação não pode ser desfeita. Isso excluirá permanentemente esse item de nossos servidores.
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