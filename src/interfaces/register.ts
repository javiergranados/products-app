import { Usuario } from './login';

export interface RegisterData {
  correo: string;
  password: string;
  nombre: string;
}

export interface RegisterResponse {
  usuario: Usuario;
  token: string;
}
