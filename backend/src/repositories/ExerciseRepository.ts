import { } from 'mongoose';
import { IExercise, IExerciseModel } from '../interfaces/models/Exercise';
import { IExerciseRepository } from '../interfaces/repositories/IExerciseRepository';

export class ExerciseRepository implements IExerciseRepository {
    private model: IExerciseModel;

    constructor(model: IExerciseModel) {
        this.model = model;
    }

    public createExercise(quizData: IExercise): any {
        try {
            const quiz = new this.model(quizData);
            return quiz.save();
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getExercise(id: string): any {
        try {
            const exercises = this.model.find({ association: id });
            return exercises;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}