import mongoose from 'mongoose';
export interface IExercise {
    category: string;
    type: string;
    question: string;
    options: [string];
    answer: [string];
    association: string;
}

export interface IExerciseDoc extends mongoose.Document {
    category: string;
    type: string;
    question: string;
    options: [string];
    answer: [string];
    association: string;
}

export interface IExerciseModel extends mongoose.Model<IExerciseDoc> { }