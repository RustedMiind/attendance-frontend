export type RoleType = {
  id: string;
  name: string;
  permissions: permissionType[];
};
export type permissionType = {
  id: number;
  name: string;
  actionId: number;
};
