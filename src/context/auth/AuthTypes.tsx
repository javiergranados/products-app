import { LoginData, Usuario } from '../../interfaces/login';
import { RegisterData } from '../../interfaces/register';

export interface AuthState {
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authenticated' | 'unauthenticated';
  errorMessage: string;
}

export interface AuthContextProps extends AuthState {
  logIn: (loginData: LoginData) => void;
  signUp: (registerData: RegisterData) => void;
  addError: (msg: string) => void;
  removeError: () => void;
  logOut: () => void;
}

export type AuthActions =
  | { type: 'LOG_IN'; payload: { token: string; user: Usuario } }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'REMOVE_ERROR' }
  | { type: 'LOG_OUT' };
