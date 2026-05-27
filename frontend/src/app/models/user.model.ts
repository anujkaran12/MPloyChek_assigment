import { UserRole, UserStatus } from '../types/user.types';

export interface AppUser {
  id: string;
  userId: string;
  name: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  lastLoginAt?: string;
  createdAt?: string;
}

export interface LoginResponse {
  user: AppUser;
}
