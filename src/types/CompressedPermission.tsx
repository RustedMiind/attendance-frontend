export type CompressedPermissionType = {
  name: string;
  actions: {
    name: string;
    permissionId: number;
  }[];
};

export type CompressedPermissionTypeWithSelect = CompressedPermissionType & {
  select?: number;
};
