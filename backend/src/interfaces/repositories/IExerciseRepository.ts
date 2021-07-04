import { IExercise } from "../models/Exercise";

export interface IExerciseRepository {
    createExercise(exerciseData: IExercise): any;
    getExercise(id: string): any;
    deleteExercise(id: string): any;
    editExercise(id: string, exerciseData: IExercise): any;
    getCourseExercise(id: string, category: string): any;
}