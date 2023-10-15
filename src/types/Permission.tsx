import { ActionType } from "./Action";

export type PermissionType = {
  id: number;
  name: string;
  actionId: number;
  action: ActionType;
};
