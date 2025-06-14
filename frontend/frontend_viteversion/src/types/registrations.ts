export type UserProps = {
  id?: string;
  FullName: string;
  Email: string;
  Position: string;
  Team: string;
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
  category: string;
};
