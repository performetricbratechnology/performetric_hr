import { useState } from "react";
import { Tab, Tabs, Description, Title } from "@/components/ui";
import type { DevelopmentPlanType } from "../types/tabs";
import { NewGoal } from "../components/development-plan/new-goal";
import { Suggestions } from "../components/development-plan/suggestions";
import { CurrentGoals } from "../components/development-plan/current-goals";

export default function DevelopmentPlanPage() {
  const [tab, setTab] = useState<DevelopmentPlanType>("current-goals");

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <Title>Plano de Desenvolvimento Individual</Title>
        <Description aria="Gerencie suas metas e acompanhe seu desenvolvimento profissional">
          Gerencie suas metas e acompanhe seu desenvolvimento profissional
        </Description>
      </div>
      <Tabs>
        <Tab
          page="developmentPlan"
          tab={tab}
          setTab={setTab}
          label="current-goals"
        >
          Metas Atuais
        </Tab>
        <Tab
          page="developmentPlan"
          tab={tab}
          setTab={setTab}
          label="suggestions"
        >
          Sugestões
        </Tab>
        <Tab page="developmentPlan" tab={tab} setTab={setTab} label="new-goal">
          Nova Meta
        </Tab>
      </Tabs>
      {tab === "new-goal" && <NewGoal />}
      {tab === "suggestions" && <Suggestions />}
      {tab === "current-goals" && <CurrentGoals />}
    </div>
  );
}
