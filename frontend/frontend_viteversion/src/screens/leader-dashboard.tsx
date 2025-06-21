import { useState } from "react";
import { Description, Title, Tab, Tabs } from "@/components/ui";
import type { LeaderDashboardType } from "../types/tabs";
import { Overview } from "@/components/leader-dashboard/overview";
import { Gaps } from "@/components/leader-dashboard/gaps";
import { Rankings } from "@/components/leader-dashboard/rankings";
import { PDI } from "@/components/leader-dashboard/pdi";

export default function LeaderDashboardPage() {
  const [tab, setTab] = useState<LeaderDashboardType>("overview");

  return (
    <div className="container mx-auto pt-8 px-2 sm:px-4 md:px-6">
      <div className="mb-8">
        <Title>Painel de Liderança</Title>
        <Description aria="Gerencie suas metas e acompanhe seu desenvolvimento profissional">
          Gerencie suas metas e acompanhe seu desenvolvimento profissional
        </Description>
      </div>
      <Tabs>
        <Tab page="leaderDashboard" tab={tab} setTab={setTab} label="overview">
          Visão Geral
        </Tab>
        <Tab page="leaderDashboard" tab={tab} setTab={setTab} label="gaps">
          Gaps
        </Tab>
        <Tab page="leaderDashboard" tab={tab} setTab={setTab} label="rankings">
          Rankings
        </Tab>
        <Tab page="leaderDashboard" tab={tab} setTab={setTab} label="pdi">
          PDI
        </Tab>
      </Tabs>

      {tab === "overview" && <Overview />}
      {tab === "gaps" && <Gaps />}
      {tab === "rankings" && <Rankings />}
      {tab === "pdi" && <PDI />}
    </div>
  );
}
