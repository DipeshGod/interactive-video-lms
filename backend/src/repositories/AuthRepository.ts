import { IResetPasswordModel } from "../interfaces/models/Code";
import { IUser, IUserDoc, IUserModel } from "../interfaces/models/User";
import { IAuthRepository } from "../interfaces/repositories/IAuthRepository";
import { Query } from "mongoose";
import { IResetPasswordDoc } from "./../interfaces/models/Code";

export class AuthRepository implements IAuthRepository {
  private userModel: IUserModel;
  private resetPasswordModel: IResetPasswordModel;

  constructor(userModel: IUserModel, resetPasswordModel: IResetPasswordModel) {
    this.userModel = userModel;
    this.resetPasswordModel = resetPasswordModel;
  }

  public registerUser(userData: IUser): Promise<IUserDoc> {
    try {
      let user = new this.userModel(userData);
      return user.save();
    } catch (err: any) {
      throw new Error(`Couldn't register new user`);
    }
  }

  public login(userData: any): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      let user = this.userModel.findOne({ email: userData.email });
      return user;
    } catch (err: any) {
      throw new Error(`Couldn't find requested user`);
    }
  }

  public forgotPassword(userData: any): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      let user = this.userModel.findOne({ email: userData.email });
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public resetPassword(
    email: string
  ): Query<IResetPasswordDoc | null, IResetPasswordDoc, {}> {
    try {
      let passwordForgotUser = this.resetPasswordModel.findOne({
        email: email,
      });
      return passwordForgotUser;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public removeResetPasswordModel(
    id: string
  ): Query<IResetPasswordDoc | null, IResetPasswordDoc, {}> {
    try {
      let removed = this.resetPasswordModel.findByIdAndDelete(id);
      return removed;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public verifyUser(
    id: string,
    userData: any
  ): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      let verified = this.userModel.findByIdAndUpdate(id, userData, {
        new: true,
      });
      if (!verified) throw new Error("Error while verifying");
      return verified;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public googleLogin(userData: any): any {
    try {
      return "google login";
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public facebookLogin(userData: any): any {
    try {
      return "facebook login";
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
