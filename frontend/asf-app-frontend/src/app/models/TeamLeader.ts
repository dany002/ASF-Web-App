export interface TeamLeader{
  id: number;
  name: string;
  picture: string;
  description: string;
}

export interface TeamLeaderAddDTO{
  name: string;
  picture: string;
  description: string;
}

export interface TeamLeaderEditDTO{
  id: number;
  name: string;
  description: string;
  picture: string;
}
