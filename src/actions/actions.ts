export interface FSAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}
