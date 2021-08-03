import {
  IStudentProgress,
  IStudentProgressModel,
} from "../interfaces/models/Progress";
import { IProgressRepository } from "../interfaces/repositories/IProgressRepository";

export class ProgressRepository implements IProgressRepository {
  private model: IStudentProgressModel;

  constructor(model: IStudentProgressModel) {
    this.model = model;
  }

  public createProgress(progressData: IStudentProgress) {
    try {
      let progress = new this.model(progressData);
      return progress.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getProgress(userId: string) {
    try {
      let progress = this.model.find({ user: userId }).populate("course");
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editProgress(queryData: any, progressData: any) {
    try {
      const progress = this.model.findOneAndUpdate(
        { course: queryData.courseId, user: queryData.userId },
        progressData,
        { new: true }
      );
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public removeProgress(id: string) {
    try {
      const progress = this.model.findOneAndRemove({ course: id });
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
