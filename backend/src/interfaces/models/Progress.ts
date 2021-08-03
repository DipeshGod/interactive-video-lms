import mongoose from "mongoose";

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
  module: [
    {
      id: string;
      score: number;
      solvedQuestions: number;
      totalQuestions: number;
    }
  ];
}

export interface IStudentProgressDoc extends mongoose.Document {
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
  module: [
    {
      id: string;
      score: number;
      solvedQuestions: number;
      totalQuestions: number;
    }
  ];
}

export interface IStudentProgressModel
  extends mongoose.Model<IStudentProgressDoc> {}
