import { Query } from "mongoose";
import { IStudentProgress, IStudentProgressDoc } from "../models/Progress";

export interface IProgressRepository {
  createProgress(progressData: IStudentProgress): Promise<IStudentProgressDoc>;
  getProgress(
    courseId: string,
    userId: string
  ): Query<IStudentProgressDoc | null, IStudentProgressDoc, {}>;
  editProgress(
    queryData: any,
    progressData: any
  ): Query<IStudentProgressDoc | null, IStudentProgressDoc, {}>;
  removeProgress(
    id: string
  ): Query<IStudentProgressDoc | null, IStudentProgressDoc, {}>;
}
