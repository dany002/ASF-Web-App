import {TeamLeader} from "./TeamLeader";

export interface Department{
  id: number;
  name: string;
  description: string;
  team_leader: TeamLeader;
  picture: string;
}

export interface DepartmentAddDTO{
  name: string;
  description: string;
  team_leader: TeamLeader;
}

export interface DepartmentEditDTO{
  id: number;
  name: string;
  description: string;
  picture: string;
  team_leader: TeamLeader;
}
