import { IUserEnrolled } from "../models/UserEnrolled";

export interface IUserEnrolledRepository {
    createUserEnrolled(userEnrolledData: IUserEnrolled): any;
    getUserEnrolled(id: string): any;
    editUserEnrolled(id: string, userEnrolledData: IUserEnrolled): any;
    removeUserEnrolled(id: string): any;
    checkUserEnrolled(userId: string, courseId: string): any;
}