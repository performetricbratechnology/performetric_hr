import { useEffect, useState } from "react";
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
import { SKILL_POST, GET_CATEGORIES } from "@/api";

type Category = {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
};

export function Skills() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { request, error } = useFetch();

  useEffect(() => {
    const fetchCategories = async () => {
      const { url, options } = GET_CATEGORIES();
      const { response, json } = await request(url, options);

      if (response?.ok && Array.isArray(json)) {
        const mappedCategories: Category[] = json.map((cat: any) => ({
          categoryId: cat.id,
          categoryName: cat.category_name,
          categoryDescription: cat.category_description,
        }));
        setCategories(mappedCategories);
      }
    };

  fetchCategories();
}, []);

      const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryId) {
      alert("Por favor, selecione uma categoria válida.");
      return;
    }

    const body = {
      skill_name: name,
      skill_description: description,
      category: categoryId,
    };

    const { url, options } = SKILL_POST(body);
    const { response, json } = await request(url, options);

    if (!response?.ok) {
      alert(error || "Erro ao cadastrar competência.");
      return;
    }

    alert("Competência cadastrada com sucesso!");
    setName("");
    setDescription("");
    setCategoryId(null);
  };



  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Nova Competência</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Competência</Label>
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
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={categoryId?.toString() || ""}
                onValueChange={(value: string) => setCategoryId(Number(value))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
               {categories.map(cat => {
                    
                    return (
                      <SelectItem key={cat.categoryId} value={cat.categoryId.toString()}>
                        {cat.categoryName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição da competência"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="sm:col-span-2">
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
