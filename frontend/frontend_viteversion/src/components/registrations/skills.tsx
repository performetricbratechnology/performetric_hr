import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

type Skills = {
  id?: number;
  name: string;
  description: string;
  category: string;
};

export function Skills() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");

  const fetchSkills = async () => {
    try {
      const res = await fetch("http://localhost:5152/api/registrations/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(
          data.map((s: any) => ({
            id: s.id,
            name: s.skillName || s.skill_name,
            description: s.skillDescription || s.skill_description,
            category: s.category || "Não especificada",
          }))
        );
      } else {
        console.error("Erro ao buscar competências.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!category) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    const payload = {
      skill_name: name,
      skill_description: description,
      category: category,
    };

    const res = await fetch("http://localhost:5152/api/registrations/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Competência cadastrada com sucesso!");
      setName("");
      setDescription("");
      setCategory("");
      fetchSkills();
    } else {
      console.error("Erro ao cadastrar competência");
    }
  };

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
            aria-label=" Cadastrar Nova Competência"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Cadastrar Nova Competência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Competence name input"
                role="label"
              >
                Nome da Competência
              </label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Nome da competência"
                className="w-full p-2 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 
                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Team select"
                role="label"
              >
                Categoria
              </label>
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                aria-label="Description input"
                role="label"
              >
                Descrição
              </label>
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

      <Card>
        <CardHeader>
          <CardTitle
            aria-label="Competências Cadastradas"
            role="heading"
            className="text-slate-900 dark:text-slate-100"
          >
            Competências Cadastradas
          </CardTitle>
          <CardDescription
            aria-label={`Total:
                     ${
                       skills.length === 1
                         ? skills.length + " competência"
                         : skills.length + " competências"
                     }`}
            role="paragraph"
          >
            Total:{" "}
            {skills.length === 1
              ? `${skills.length} competência`
              : `${skills.length} competências`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex flex-col-reverse sm:flex-col">
                <p className="text-md font-medium" aria-label={skill.name}>
                  {skill.name}
                </p>
                <div>
                  <p
                    className="text-slate-700 dark:text-slate-200"
                    aria-label={skill.description}
                  >
                    {skill.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold my-1">
                  <Badge aria-label={skill.category} role="status">
                    {skill.category}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 max-sm:self-end">
                <Button
                  variant="outline"
                  className="hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900  focus:bg-slate-900 focus:text-slate-100 dark:focus:bg-slate-100 dark:focus:text-slate-900 focus:outline-none"
                >
                  <Edit className="size-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-500 hover:text-red-50 focus:bg-red-500 focus:text-red-50 focus:outline-none"
                  aria-label="Remover"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
