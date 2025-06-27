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
import type {
  UserProps,
  ControlTypes,
  TeamProps,
  SkillsProps,
} from "@/types/registrations";
import { ControlTeams } from "./control/control-teams";
import { ControlSkill } from "./control/control-skills";

type Props = {
  tab: ControlTypes;
  user?: UserProps;
  team?: TeamProps;
  skill?: SkillsProps;
};

export function ControlButtons({ tab, user, team, skill }: Props) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!user || !user.id) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5152/api/removeUser/${user.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao remover usuário");
      }

      alert("Usuário removido com sucesso!");
      setAlertOpen(false);
      // Aqui você pode chamar alguma função para atualizar a lista, por ex.
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Erro: ${error.message || error}`);
      } else {
        alert(`Erro genérico`);
      }
    } finally {
      setIsDeleting(false);
    }
  }

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
            <div className="p-4 text-center text-slate-500">
              Nenhum usuário selecionado.
            </div>
          )}
          {tab === "teams" && (
            <ControlTeams team={team} onClose={() => setOpen(false)} />
          )}
          {tab === "skills" && (
            <ControlSkill skill={skill} onClose={() => setOpen(false)} />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
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
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
              {isDeleting ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
