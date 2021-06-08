import { Query } from 'mongoose';
import { IUserDoc, IUserModel } from '../interfaces/models/User';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  private model: IUserModel;

  constructor(model: IUserModel) {
    this.model = model;
  }
  public getUser(): Query<IUserDoc[], IUserDoc, {}> {
    try {
      const users = this.model.find({});
      return users;
    } catch (err: any) {
      throw new Error(`couldn't get users`);
    }
  }

  // public getUserByEmail(email: string): any {
  //   try {
  //     const user = this.model.find({ email: email });
  //     return user;
  //   } catch (err: any) {
  //     throw new Error(err);
  //   }
  // }

  public editUserByEmail(userData: any): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      let user = this.model.findOneAndUpdate(
        { email: userData.email },
        userData,
        { new: true }
      );
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
