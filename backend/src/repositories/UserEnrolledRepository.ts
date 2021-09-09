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

  public createUserEnrolled(userEnrolledData: any) {
    try {
      const userEnrolled = new this.model(userEnrolledData);
      return userEnrolled.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getUserEnrolled(id: string) {
    try {
      const userEnrolled = this.model.find({ user: id }).populate("course");
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editUserEnrolled(id: string, userEnrolledData: IUserEnrolled) {
    try {
      const userEnrolled = this.model.findOneAndUpdate(
        { user: id },
        userEnrolledData,
        { new: true }
      );
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editOverallScore(
    userId: string,
    courseId: string,
    overallScore: number
  ) {
    try {
      const userEnrolled = this.model.findOneAndUpdate(
        { user: userId, course: courseId },
        { overallProgress: overallScore },
        { new: true }
      );
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public removeUserEnrolled(id: string) {
    try {
      const userEnrolled = this.model.findOneAndRemove({ user: id });
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public checkUserEnrolled(userId: string, courseId: string) {
    try {
      const userEnrolled = this.model.findOne({
        user: userId,
        course: courseId,
      });
      return userEnrolled;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
