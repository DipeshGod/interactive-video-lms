import { Query } from "mongoose";
import { IUserEnrolled, IUserEnrolledDoc } from "../models/UserEnrolled";

export interface IUserEnrolledRepository {
  createUserEnrolled(userEnrolledData: any): Promise<IUserEnrolledDoc>;
  getUserEnrolled(id: string): Query<IUserEnrolledDoc[], IUserEnrolledDoc, {}>;
  editUserEnrolled(
    id: string,
    userEnrolledData: IUserEnrolled
  ): Query<IUserEnrolledDoc | null, IUserEnrolledDoc, {}>;
  removeUserEnrolled(
    id: string
  ): Query<IUserEnrolledDoc | null, IUserEnrolledDoc, {}>;
  checkUserEnrolled(
    userId: string,
    courseId: string
  ): Query<IUserEnrolledDoc | null, IUserEnrolledDoc, {}>;
}
