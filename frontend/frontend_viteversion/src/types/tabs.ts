export type TabsByPage = {
  registrations: "users" | "teams" | "competences";
  employeeDashboard: "competences" | "evolution" | "feedbacks" | "goals";
  leaderDashboard: "overview" | "gaps" | "rankings" | "pdi";
  developmentPlan: "current-goals" | "suggestions" | "new-goal";
  rankings: "overall-ranking" | "by-competence" | "teams" | "achievements";
};

export type PageKey = keyof TabsByPage;
export type TabValue<P extends PageKey> = TabsByPage[P];

export type RegistrationsType = TabsByPage["registrations"];
export type EmployeeDashboardType = TabsByPage["employeeDashboard"];
export type LeaderDashboardType = TabsByPage["leaderDashboard"];
export type RankingsType = TabsByPage["rankings"];
export type DevelopmentPlanType = TabsByPage["developmentPlan"];
