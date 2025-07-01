export type UserProps = {
  id?: string;
  FullName: string;
  Email: string;
  Position: string;
  Team: string;
};

export type UserApiPayload = {
  id: string;
  full_name: string;
  email: string;
  position: string;
  team: string;
};


export type UProps = {
  id: string;
  full_name: string;
  FullName: string;
  Email: string;
  email: string;
  Position: string;
  position: string;
  Team: string;
  team: string;
};

export type TeamProps = {
  id?: string;
  name: string;
  description: string;
  members?: number;
  team?: string;
};

export type TProps = {
  id: string;
  team_name: string;
  TeamName: string;
  description: string;
  Description: string;
  members: number;
  Members: number;
};

export type SkillsProps = {
  id?: string;
  name: string;
  description: string;
  category: string;
};

export type SProps = {
  id: string;
  skill_name: string;
  skillName: string;
  skill_description: string;
  skillDescription: string;
  categoryId: number;
  categoryName: string;
};

export type ControlTypes = "users" | "teams" | "skills";

export type ControlProps = {
  tab: ControlTypes;
  id: string;
};

export type UsersControl = {
  name: string;
  role: string;
  skill: string;
  team: string;
};
