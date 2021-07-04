import { } from 'mongoose';
import { IExercise, IExerciseModel } from '../interfaces/models/Exercise';
import { IExerciseRepository } from '../interfaces/repositories/IExerciseRepository';

export class ExerciseRepository implements IExerciseRepository {
    private model: IExerciseModel;

    constructor(model: IExerciseModel) {
        this.model = model;
    }

    public createExercise(exerciseData: IExercise): any {
        try {
            const exercise = new this.model(exerciseData);
            return exercise.save();
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

    public deleteExercise(id: string): any {
        try {
            const exercise = this.model.findByIdAndDelete(id);
            return exercise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public editExercise(id: string, exerciseData: IExercise): any {
        try {
            const exercise = this.model.findByIdAndUpdate(id, exerciseData, {
                new: true,
            });
            return exercise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getCourseExercise(id: string, category: string) {
        try {
            const exercises = this.model.find({ association: id, category: category });
            return exercises;
        } catch (err: any) {
            throw new Error(err.toString())
        }
    }
}