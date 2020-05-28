export interface LoginRequestInput {
  username: string;
  password: string;
  onSuccess: Function;
  onError: Function;
}
