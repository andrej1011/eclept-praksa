export type UserRole = 'user' | 'guest' | 'admin';

export interface User {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  role: UserRole;
}