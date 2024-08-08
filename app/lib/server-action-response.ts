export type TServerActionResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: string;
};