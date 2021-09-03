import { Query } from "mongoose";
import {
  IExercise,
  IExerciseDoc,
  IExerciseModel,
} from "../interfaces/models/Exercise";
import { IExerciseRepository } from "../interfaces/repositories/IExerciseRepository";

export class ExerciseRepository implements IExerciseRepository {
  private model: IExerciseModel;

  constructor(model: IExerciseModel) {
    this.model = model;
  }

  public createExercise(exerciseData: IExercise): Promise<IExerciseDoc> {
    try {
      const exercise = new this.model(exerciseData);
      return exercise.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getExercise(
    id: string,
    category: string
  ): Query<IExerciseDoc[], IExerciseDoc, {}> {
    try {
      const exercises = this.model.find({
        association: id,
        category: category,
      });
      return exercises;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public deleteExercise(
    id: string
  ): Query<IExerciseDoc | null, IExerciseDoc, {}> {
    try {
      const exercise = this.model.findByIdAndDelete(id);
      return exercise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editExercise(
    id: string,
    exerciseData: IExercise
  ): Query<IExerciseDoc | null, IExerciseDoc, {}> {
    try {
      const exercise = this.model.findByIdAndUpdate(id, exerciseData, {
        new: true,
      });
      return exercise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  /*  public getCourseExercise(id: string, category: string):Query<IExerciseDoc[], IExerciseDoc, {}> {
         try {
             const exercises = this.model.find({ association: id, category: category });
             return exercises;
         } catch (err: any) {
             throw new Error(err.toString())
         }
     } */
}
