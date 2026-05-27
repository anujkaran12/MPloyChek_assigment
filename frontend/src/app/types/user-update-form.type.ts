import { UserRole, UserStatus } from './user.types';

export interface UserUpdateForm {
  name: string;
  role: UserRole;
  department: string;
  status: UserStatus;
}
