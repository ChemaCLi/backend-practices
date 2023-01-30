import { User } from '../user';

export interface IUserRepository {
  persist(entity: User): Promise<void>;
  list({ page, pageSize }: { page: number; pageSize: number }): Promise<User[]>;
  getById(id: number): Promise<User>;
  deleteById(id: number): Promise<void>;
}
