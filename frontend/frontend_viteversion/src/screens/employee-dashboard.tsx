import { useState } from "react";
import { Tab, Tabs, Description, Title } from "@/components/ui";
import type { EmployeeDashboardType } from "../types/tabs";
import { Skills } from "@/components/employee-dashboard/skills";
import { Evolution } from "@/components/employee-dashboard/evolution";
import { Feedbacks } from "@/components/employee-dashboard/feedbacks";
import { Goals } from "@/components/employee-dashboard/goals";

export default function EmployeeDashboardPage() {
  const [tab, setTab] = useState<EmployeeDashboardType>("competences");

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <Title>Meu Painel de Competências</Title>
        <Description aria="Acompanhe sua evolução e desenvolvimento profissional">
          Acompanhe sua evolução e desenvolvimento profissional
        </Description>
      </div>
      <Tabs>
        <Tab
          page="employeeDashboard"
          tab={tab}
          setTab={setTab}
          label="competences"
        >
          Competências
        </Tab>
        <Tab
          page="employeeDashboard"
          tab={tab}
          setTab={setTab}
          label="evolution"
        >
          Evolução
        </Tab>
        <Tab
          page="employeeDashboard"
          tab={tab}
          setTab={setTab}
          label="feedbacks"
        >
          Feedbacks
        </Tab>
        <Tab page="employeeDashboard" tab={tab} setTab={setTab} label="goals">
          Metas
        </Tab>
      </Tabs>
      {tab === "competences" && <Skills />}
      {tab === "evolution" && <Evolution />}
      {tab === "feedbacks" && <Feedbacks />}
      {tab === "goals" && <Goals />}
    </div>
  );
}
