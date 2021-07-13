import mongoose from "mongoose";

export interface IStudentProgress {
    userId: string;
    courseId: string;
    preTest: {
        score: number;
        solvedQuestions: number;
        totalQuestions: number;
    }
    finalTestScore: {
        score: number;
        solvedQuestions: number;
        totalQuestions: number;
    }
    module: [{
        id: string;
        score: number;
        solvedQuestions: number;
        totalQuestions: number;

    }];
}

export interface IStudentProgressDoc extends mongoose.Document {
    userId: string;
    courseId: string;
    preTest: {
        score: number;
        solvedQuestions: number;
        totalQuestions: number;
    }
    finalTestScore: {
        score: number;
        solvedQuestions: number;
        totalQuestions: number;
    }
    module: [{
        id: string;
        score: number;
        solvedQuestions: number;
        totalQuestions: number;

    }];
}

export interface IStudentProgressModel extends mongoose.Model<IStudentProgressDoc> { }