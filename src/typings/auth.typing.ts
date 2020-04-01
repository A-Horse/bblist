export interface LoginRequestInput {
  email: string;
  password: string;
  onSuccess: Function;
  onError: Function;
}
