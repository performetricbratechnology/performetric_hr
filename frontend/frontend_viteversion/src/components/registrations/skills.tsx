import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Input,
  Label,
  Button,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui";
import { SkillsList } from "../home/skills-list";
import useFetch from "@/lib/hooks/useFetch";
import { SKILL_POST } from "@/api";

export function Skills() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const { request, error } = useFetch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = {
      skill_name: name,
      skill_description: description,
      category: category,
    };
    const { url, options } = SKILL_POST(body);
    const { response } = await request(url, options);

    if (!response?.ok) alert(error || "Erro ao cadastrar competência.");

    alert("Competência cadastrada com sucesso!");
    setName("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle aria-label=" Cadastrar Nova Competência" role="heading">
            Cadastrar Nova Competência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="name"
                aria-label="Competence name input"
                role="label"
              >
                Nome da Competência
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                placeholder="Nome da competência"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                aria-label="category select"
                role="label"
              >
                Categoria
              </Label>
              <Select
                value={category}
                onValueChange={(value: string) => setCategory(value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technique">Técnica</SelectItem>
                  <SelectItem value="behavioral">Comportamental</SelectItem>
                  <SelectItem value="leadership">Liderança</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label
                htmlFor="description"
                aria-label="Description input"
                role="label"
              >
                Descrição
              </Label>
              <Textarea
                id="description"
                placeholder="Descrição da competência"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="sm:col-span-2"
              aria-label="Adicionar Competência"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Competência
            </Button>
          </form>
        </CardContent>
      </Card>
      <SkillsList />
    </div>
  );
}
