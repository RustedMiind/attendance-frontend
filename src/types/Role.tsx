import { PermissionType } from "./Permission";

export type RoleType = {
  id: string;
  name: string;
  permissions: PermissionType[];
};
