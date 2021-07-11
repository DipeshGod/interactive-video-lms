import { Query } from "mongoose";
import { IUserDoc, IUserModel } from "../interfaces/models/User";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";

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

  public getUserByEmail(email: string): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      const user = this.model.findOne({ email: email });
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getUserById(id: string): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      const user = this.model.findById(id);
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editUser(id: string, userData: any): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      let user = this.model.findByIdAndUpdate(
        id, userData,
        { new: true }
      );
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public deleteUser(id: string): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      const user = this.model.findByIdAndRemove(id);
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getUserByIdWithPassword(id: string): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      const user = this.model.findById(id).select('+password');
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getEnrolledCourses(id: string): Query<IUserDoc | null, IUserDoc, {}> {
    try {
      const user = this.model.findById(id).populate('enrolledCourse');
      return user;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
