import type { UserProps } from "./types/registrations";

const API = "http://localhost:5152/api";

export function USERS_GET() {
  return {
    url: API + "/registrations/users",
    options: {
      method: "GET",
    },
  };
}

export function USER_POST(body: UserProps) {
  return {
    url: API + "/registrations/users",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TEAMS_GET() {
  return {
    url: API + "/registrations/teams",
    options: {
      method: "GET",
    },
  };
}

export function TEAM_POST(body: { team_name: string; description: string }) {
  return {
    url: API + "/registrations/teams",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function SKILLS_GET() {
  return {
    url: API + "/registrations/skills",
    options: {
      method: "GET",
    },
  };
}

export function SKILL_POST(body: {
  skill_name: string;
  skill_description: string;
  category: string;
}) {
  return {
    url: API + "/registrations/skills",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
