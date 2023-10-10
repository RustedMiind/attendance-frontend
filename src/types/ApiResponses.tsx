export type ApiSuccessfullResponse<T> = {
  data: T;
  message: string;
  status: string;
};
export type ApiErrorResponse<T> = {
  response: { data: ApiSuccessfullResponse<T> };
};
