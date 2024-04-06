import { IUser } from './user.interface';

export interface UsersStateInterface {
  isLoading: boolean;
  users: IUser[];
  error: string | null;
  totalPages: number;
  searchQuery?: number;
}
