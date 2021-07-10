import { IStudentProgress } from "../models/Progress";

export interface IProgressRepository {
    createProgress(progressData: IStudentProgress): any;
    getProgress(id: string): any;
    editProgress(id: string, progressData: IStudentProgress): any;
    removeProgress(id: string): any;
}