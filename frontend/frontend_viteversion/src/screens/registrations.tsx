import { useState } from "react";
import { Tab, Tabs } from "../components/ui/tabs";
import { Users } from "../components/registrations/users";
import { Teams } from "../components/registrations/teams";
import { Competences } from "../components/registrations/competences";

export default function RegistrationsPage() {
  const [tab, setTab] = useState("users");

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2"
          aria-label="Módulo de Cadastro"
        >
          Módulo de Cadastro
        </h1>
        <p
          className="text-slate-600 dark:text-slate-400"
          aria-label="Gerencie usuários, times e competências do sistema"
        >
          Gerencie usuários, times e competências do sistema
        </p>
      </div>
      <Tabs>
        <Tab tab={tab} setTab={setTab} label="users">
          Usuários
        </Tab>
        <Tab tab={tab} setTab={setTab} label="teams">
          Times
        </Tab>
        <Tab tab={tab} setTab={setTab} label="competences">
          Competências
        </Tab>
      </Tabs>
      {tab === "users" && <Users />}
      {tab === "teams" && <Teams />}
      {tab === "competences" && <Competences />}
    </div>
  );
}
