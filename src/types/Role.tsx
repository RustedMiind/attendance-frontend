export type RoleType = {
  id: string;
  name: string;
  accesses: accessType[];
};
export type accessType = {
  id: number;
  name: string;
  actionId: number;
};
