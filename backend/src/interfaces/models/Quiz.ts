import mongoose from 'mongoose';
export interface IQuiz {
    category: string;
    type: string;
    question: string;
    options: [string];
    answer: [string];
    association: string;
}

export interface IQuizDoc extends mongoose.Document {
    category: string;
    type: string;
    question: string;
    options: [string];
    answer: [string];
    association: string;
}

export interface IQuizModel extends mongoose.Model<IQuizDoc> { }