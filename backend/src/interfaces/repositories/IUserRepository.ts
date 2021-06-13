import { IUserDoc } from "../models/User";
import { Query } from "mongoose";
export interface IUserRepository {
  getUser(): Query<IUserDoc[], IUserDoc, {}>;
  getUserByEmail(email: string): Query<IUserDoc | null, IUserDoc, {}>;
  editUser(id: string, data: any): Query<IUserDoc | null, IUserDoc, {}>;
}
