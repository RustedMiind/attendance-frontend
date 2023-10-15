export type CompressedPermissionType = {
  name: string;
  actions: {
    name: string;
    permissionId: number;
  }[];
};
