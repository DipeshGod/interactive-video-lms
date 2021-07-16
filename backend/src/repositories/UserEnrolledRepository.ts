import {
  IUserEnrolled,
  IUserEnrolledModel,
} from "../interfaces/models/UserEnrolled";
import { IUserEnrolledRepository } from "../interfaces/repositories/IUserEnrolledRepository";

export class UserEnrolledRepository implements IUserEnrolledRepository {
  private model: IUserEnrolledModel;

  constructor(model: IUserEnrolledModel) {
    this.model = model;
  }

  public createUserEnrolled(userEnrolledData: IUserEnrolled): any {
    try {
      const userEnrolled = new this.model(userEnrolledData);
      return userEnrolled.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getUserEnrolled(id: string): any {
    try {
      const userEnrolled = this.model.find({ userId: id }).populate("courseId");
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editUserEnrolled(id: string, userEnrolledData: IUserEnrolled): any {
    try {
      const userEnrolled = this.model.findOneAndUpdate(
        { userId: id },
        userEnrolledData,
        { new: true }
      );
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public removeUserEnrolled(id: string): any {
    try {
      const userEnrolled = this.model.findOneAndRemove({ userId: id });
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
