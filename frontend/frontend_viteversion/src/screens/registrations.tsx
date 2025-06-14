import { useState } from "react";
import { Tab, Tabs, Title, Description } from "@/components/ui";
import { Users } from "@/components/registrations/users";
import { Teams } from "@/components/registrations/teams";
import { Skills } from "@/components/registrations/skills";
import type { RegistrationsType } from "@/types/tabs";

export default function RegistrationsPage() {
  const [tab, setTab] = useState<RegistrationsType>("users");

  const RegisterNewUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("FullName")?.toString();
    const email = formData.get("Email")?.toString();
    const position = formData.get("Position")?.toString();
    const team = formData.get("Team")?.toString();

    const res = await fetch("http://localhost:5152/api/registrations/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FullName: name,
        Email: email,
        Position: position,
        Team: team,
      }),
    });

    if (res.ok) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      const data = await res.json();
      alert(data.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <Title>Módulo de Cadastro</Title>
        <Description aria="Gerencie usuários, times e competências do sistema">
          Gerencie usuários, times e competências do sistema
        </Description>
      </div>
      <Tabs>
        <Tab page="registrations" tab={tab} setTab={setTab} label="users">
          Usuários
        </Tab>
        <Tab page="registrations" tab={tab} setTab={setTab} label="teams">
          Times
        </Tab>
        <Tab page="registrations" tab={tab} setTab={setTab} label="competences">
          Competências
        </Tab>
      </Tabs>
      {tab === "users" && <Users />}
      {tab === "teams" && <Teams />}
      {tab === "competences" && <Skills />}
    </div>
  );
}
