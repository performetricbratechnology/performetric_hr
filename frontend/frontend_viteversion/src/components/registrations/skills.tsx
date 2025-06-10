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
          <CardTitle className="text-slate-900 dark:text-slate-100">
            Cadastrar Nova Competência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Nome da Competência
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Nome da competência"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Categoria
              </label>
              <Select value={category} onValueChange={(value: string) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent id="category">
                  <SelectItem value="technique">Técnica</SelectItem>
                  <SelectItem value="behavioral">Comportamental</SelectItem>
                  <SelectItem value="leadership">Liderança</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full min-h-20 p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Descrição da competência"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="size-5" />
              Adicionar Competência
            </button>

          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">
            Competências Cadastradas
          </CardTitle>
          <CardDescription>
            Total: {skills.length === 1 ? "1 competência" : `${skills.length} competências`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex max-sm:flex-col sm:justify-between items-start sm:items-center gap-4 p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div className="flex flex-col-reverse sm:flex-col">
                <p className="text-lg font-medium">{skill.name}</p>
                <p className="text-slate-700 dark:text-slate-200">{skill.description}</p>
                <span className="text-xs font-bold py-0.5 px-3 bg-slate-700 dark:bg-slate-300 text-slate-50 dark:text-slate-950 rounded-xl mt-1 inline-block">
                  {skill.category}
                </span>
              </div>
              <div className="flex gap-2 max-sm:self-end *:flex *:justify-center *:items-center *:gap-2 *:text-sm *:transition-colors *:p-2 *:sm:p-3 *:border *:border-slate-300 *:dark:border-slate-700 *:rounded-xl *:cursor-pointer">
                <button className="hover:bg-blue-500 active:bg-blue-500 hover:text-blue-50 active:text-blue-50">
                  <Edit className="size-4" />
                  Editar
                </button>
                <button className="hover:bg-red-500 active:bg-red-500 hover:text-red-50 active:text-red-50">
                  <Trash className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
