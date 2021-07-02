import { } from 'mongoose';
import { IQuiz, IQuizModel } from '../interfaces/models/Quiz';
import { IQuizRepository } from '../interfaces/repositories/IQuizRepository';

export class QuizRepository implements IQuizRepository {
    private model: IQuizModel;

    constructor(model: IQuizModel) {
        this.model = model;
    }

    public createQuiz(quizData: IQuiz): any {
        try {
           /*  const quiz = new this.model(quizData);
            return quiz.save(); */
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getQuiz(id: string): any {
        try {
            /* const quiz = this.model.find({});
            return quiz; */
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}