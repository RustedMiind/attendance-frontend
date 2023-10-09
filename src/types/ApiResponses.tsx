export type ApiSuccessfullResponse<T> = {
  data: T;
  message: string;
  status: string;
};
