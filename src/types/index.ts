export interface UserState {
  user: User | null;
  loggedin: boolean;
  loading: boolean;
  locale: string;
}

export interface User {
  name: string | null;
  email: string;
  password?: string | null;
  token?: string;
}

export interface Error {
  iserror: boolean;
  message?: string | null;
}
export type InputProps = {
  key: string;
  input?: string;
  focused?: boolean;
  error?: boolean;
  errorMessage?: string | null;
};
