import { Usuario } from '@/src/interfaces/login';

export interface AuthState {
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authenticated' | 'unauthenticated';
  errorMessage: string;
}

export interface AuthContextProps extends AuthState {
  logIn: () => void;
  addError: () => void;
  removeError: () => void;
  logOut: () => void;
}

export type AuthActions =
  | { type: 'LOG_IN'; payload: { token: string; user: Usuario } }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'REMOVE_ERROR' }
  | { type: 'LOG_OUT' };