import { IUser, IUserDoc } from "../models/User";
import { Query } from "mongoose";
import { IResetPassword, IResetPasswordDoc } from "../models/ResetPassword";

export interface IAuthRepository {
  registerUser(userData: IUser): Promise<IUserDoc>;
  login(userData: any): Query<IUserDoc | null, IUserDoc, {}>;
  forgotPassword(userData: any): Query<IUserDoc | null, IUserDoc, {}>;
  resetPassword(data: String): Query<IResetPasswordDoc | null, IResetPasswordDoc, {}>;
  removeResetPasswordModel(id: string): Query<IResetPasswordDoc | null, IResetPasswordDoc, {}>;
  verifyUser(id: string, userData: IUser): Query<IUserDoc | null, IUserDoc, {}>;
  resetCodeSave(data: IResetPassword): Promise<IResetPasswordDoc>;
}
