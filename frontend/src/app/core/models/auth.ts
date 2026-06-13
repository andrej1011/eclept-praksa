import { User } from './user';

export interface LoginRequest { username: string; password: string; }

export interface RegisterRequest {
  username: string;
  password: string;
  confirm_password: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
}