import mongoose from "mongoose";

export interface IUserEnrolled {
    userId: string;
    courseId: string;
    overallProgress: number;
    currentChapter: string;
    currentVideo: string;
}

export interface IUserEnrolledDoc extends mongoose.Document {
    userId: string;
    courseId: string;
    overallProgress: number;
    currentChapter: string;
    currentVideo: string;
}

export interface IUserEnrolledModel extends mongoose.Model<IUserEnrolledDoc> { }