import mongoose from "mongoose";

export interface IStudentProgress {
    userId: string;
    courseId: string;
    preTestScore: string;
    finalTestScore: string;
    module: [{
        id: string;
        score: number;
    }];
    totalExercise: number;
    solvedExercise: number;
}

export interface IStudentProgressDoc extends mongoose.Document {
    userId: string;
    courseId: string;
    preTestScore: string;
    finalTestScore: string;
    module: [{
        id: string;
        score: number;
    }];
    totalExercise: number;
    solvedExercise: number;
}

export interface IStudentProgressModel extends mongoose.Model<IStudentProgressDoc> { }