import mongoose from "mongoose";

export interface IUserEnrolled {
  user: string;
  course: string;
  overallProgress: number;
  currentChapter: string;
  currentVideo: string;
}

export interface IUserEnrolledDoc extends mongoose.Document {
  user: string;
  course: string;
  overallProgress: number;
  currentChapter: string;
  currentVideo: string;
}

export interface IUserEnrolledModel extends mongoose.Model<IUserEnrolledDoc> {}
