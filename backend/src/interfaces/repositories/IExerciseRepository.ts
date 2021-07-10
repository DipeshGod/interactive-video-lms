import { Query } from "mongoose";
import { IExercise, IExerciseDoc } from "../models/Exercise";

export interface IExerciseRepository {
    createExercise(exerciseData: IExercise): Promise<IExerciseDoc>;
    getExercise(id: string, category: string): Query<IExerciseDoc[], IExerciseDoc, {}>;
    deleteExercise(id: string): Query<IExerciseDoc | null, IExerciseDoc, {}>;
    editExercise(id: string, exerciseData: IExercise): Query<IExerciseDoc | null, IExerciseDoc, {}>;
    // getCourseExercise(id: string, category: string): Query<IExerciseDoc[], IExerciseDoc, {}>;
}