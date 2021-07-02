import { IQuiz } from "../models/Quiz";

export interface IQuizRepository {
    createQuiz(quizData: IQuiz): any;
    getQuiz(id: string): any;
}