import { IUserDoc } from "../models/User";
import { Query } from "mongoose";
export interface IUserRepository {
  getUser(): Query<IUserDoc[], IUserDoc, {}>;
  getUserByEmail(email: string): any;
  editUserByEmail(data: any): Query<IUserDoc | null, IUserDoc, {}>;
}
