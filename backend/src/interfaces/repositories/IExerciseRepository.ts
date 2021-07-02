import { IExercise } from "../models/Exercise";

export interface IExerciseRepository {
    createExercise(quizData: IExercise): any;
    getExercise(id: string): any;
}