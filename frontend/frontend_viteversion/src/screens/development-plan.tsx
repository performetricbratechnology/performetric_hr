import { useState } from "react";
import { Tab, Tabs } from "../components/ui/tabs";
import type { DevelopmentPlanType } from "../types/tabs";
import { NewGoal } from "../components/development-plan/new-goal";
import { Suggestions } from "../components/development-plan/suggestions";
import { CurrentGoals } from "../components/development-plan/current-goals";

export default function DevelopmentPlanPage() {
  const [tab, setTab] = useState<DevelopmentPlanType>("current-goals");

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2"
          aria-label="Plano de Desenvolvimento Individual"
        >
          Plano de Desenvolvimento Individual
        </h1>
        <p
          className="text-slate-600 dark:text-slate-400"
          aria-label="Gerencie suas metas e acompanhe seu desenvolvimento profissional"
        >
          Gerencie suas metas e acompanhe seu desenvolvimento profissional
        </p>
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
