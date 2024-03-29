import { IUserDoc } from '../models/User';
import { Query } from 'mongoose';
export interface IUserRepository {
  getUser(): Query<IUserDoc[], IUserDoc, {}>;
  getUserByEmail(email: string): Query<IUserDoc | null, IUserDoc, {}>;
  editUser(id: string, data: any): Query<IUserDoc | null, IUserDoc, {}>;
  getUserById(id: string): Query<IUserDoc | null, IUserDoc, {}>;
  deleteUser(id: string): Query<IUserDoc | null, IUserDoc, {}>;
  getUserByIdWithPassword(id: string): Query<IUserDoc | null, IUserDoc, {}>;
  createEnterpriseSectionUsers(users: any): Promise<IUserDoc[]>;
}
