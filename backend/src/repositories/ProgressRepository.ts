import {
  IStudentProgress,
  IStudentProgressModel,
} from "../interfaces/models/Progress";
import { IProgressRepository } from "../interfaces/repositories/IProgressRepository";

export class ProgressRepository implements IProgressRepository {
  private studentProgressModel: IStudentProgressModel;

  constructor(studentProgressModel: IStudentProgressModel) {
    this.studentProgressModel = studentProgressModel;
  }

  public createProgress(progressData: IStudentProgress) {
    try {
      let progress = new this.studentProgressModel(progressData);
      return progress.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getProgress(userId: any) {
    try {
      let progress = this.studentProgressModel
        .find({ user: userId })
        .populate("course")
        .populate("moduleProgress.module");
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getModuleProgress(queryData: any) {
    try {
      const progress = this.studentProgressModel.findOne({
        user: queryData.userId,
        "moduleProgress.module": queryData.courseId,
      });
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editPreTest(queryData: any, progressData: any) {
    try {
      const progress = this.studentProgressModel.findOneAndUpdate(
        { course: queryData.courseId, user: queryData.userId },
        progressData,
        { new: true }
      );
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editModule(moduleProgressId: any, progressData: any) {
    try {
      const progress = this.studentProgressModel.findOneAndUpdate(
        {
          "moduleProgress._id": moduleProgressId,
        },
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
      const progress = this.studentProgressModel.findOneAndRemove({
        course: id,
      });
      return progress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  /*  public createModuleProgress(data: any) {
    try {
      const moduleProgress = new this.moduleProgressModel(data);
      return moduleProgress.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  } */
}
