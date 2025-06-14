import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Input,
  Label,
  Textarea,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui";
import { TEAM_POST } from "@/api";
import useFetch from "@/lib/hooks/useFetch";
import { TeamsList } from "../home/teams-list";

export function Teams() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { request, error } = useFetch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const body = {
      team_name: name,
      description: description,
    };
    const { url, options } = TEAM_POST(body);
    const { response } = await request(url, options);

    if (!response?.ok) alert(error || "Erro ao cadastrar time.");

    alert("Time cadastrado com sucesso!");
    setName("");
    setDescription("");
  };

  return (
    <div className="my-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle aria-label="Cadastrar Novo Time" role="heading">
            Cadastrar Novo Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" aria-label="Team name input" role="label">
                Nome do Time
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                aria-label="Description input"
                role="label"
              >
                Descrição
              </Label>
              <Textarea
                id="description"
                placeholder="Descrição do time"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              aria-label="Adicionar Time"
              role="button"
            >
              <Plus className="size-5" />
              Adicionar Time
            </Button>
          </form>
        </CardContent>
      </Card>
      <TeamsList />
    </div>
  );
}
