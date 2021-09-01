import mongoose, { Document, Model } from "mongoose";

export interface IStudentProgress {
  user: string;
  course: string;
  preTest: {
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  };
  finalTestScore: {
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  };
  moduleProgress: {
    module: string;
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  }[];
}

export interface IStudentProgressDoc extends Document {
  user: string;
  course: string;
  preTest: {
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  };
  finalTestScore: {
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  };
  moduleProgress: {
    module: string;
    score: number;
    solvedQuestions: number;
    totalQuestions: number;
  }[];
}

export interface IStudentProgressModel extends Model<IStudentProgressDoc> {}

/* export interface IModuleProgress {
  id: string;
  title: string;
  score: number;
  solvedQuestions: number;
  totalQuestions: number;
}

export interface IModuleProgressDoc extends Document {
  id: string;
  title: string;
  score: number;
  solvedQuestions: number;
  totalQuestions: number;
}

export interface IModuleProgressModel extends Model<IModuleProgressDoc> {} */
