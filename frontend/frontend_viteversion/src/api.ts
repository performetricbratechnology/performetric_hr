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

export const MODIFY_NAME = (user: {
  id: string;
  full_name: string;
  position: string;
  email: string;
  team: string;
}) => ({
  url: `${API}/EditUser/modify-name`,
  options: {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  },
});

export const MODIFY_POSITION = (user: {
  id: string;
  full_name: string;
  position: string;
  email: string;
  team: string;
}) => ({
  url: `${API}/EditUser/modify-position`,
  options: {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  },
});

export const MODIFY_TEAM = (user: {
  id: string;
  full_name: string;
  position: string;
  email: string;
  team: string;
}) => ({
  url: `${API}/EditUser/modify-team`,
  options: {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  },
});

export const ADD_SKILL = (employeeId: string, skillId: string) => ({
  url: `${API}/EditUser/add-skill`,
  options: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId, skillId }),
  },
});
