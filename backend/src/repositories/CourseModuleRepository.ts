import { ICourseModule, ICourseModuleModel } from "../interfaces/models/CourseModule";
import { ICourseModuleRepository } from "../interfaces/repositories/ICourseModuleRepository";
import { ICourseModuleDoc } from './../interfaces/models/CourseModule';
import { Query } from 'mongoose';

export class CourseModuleRepository implements ICourseModuleRepository {
    private model: ICourseModuleModel;

    constructor(model: ICourseModuleModel) {
        this.model = model;
    }

    public createCourseModule(courseModuleData: ICourseModule): Promise<ICourseModuleDoc> {
        try {
            const courseModule = new this.model(courseModuleData);
            return courseModule.save();
        } catch (err: any) {
            throw new Error("Couldn't create course module");
        }
    }

    public getCourseModuleByCourseId(id: string): Query<ICourseModuleDoc[], ICourseModuleDoc, {}> {
        try {
            const courseModules = this.model.find({ courseId: id })
            return courseModules;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public editCourseModule(id: string, moduleData: ICourseModuleDoc): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}> {
        try {
            const updatedModule = this.model.findByIdAndUpdate(id, moduleData, {
                new: true
            })
            return updatedModule;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public deleteCourseModule(id: string): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}> {
        try {
            const courseModule = this.model.findByIdAndDelete(id);
            return courseModule;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getCourseModuleByModuleId(id: string): Query<ICourseModuleDoc | null, ICourseModuleDoc, {}> {
        try {
            const courseModule = this.model.findById(id);
            return courseModule;
        } catch (err: any) {
            throw new Error(err.toString())
        }
    }

    public getExercises(id: string): any {
        try {
            const exercises = this.model.find({ exercise: id })
            return exercises;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public editExercise(id: string): any {
        try {
            const updatedExercise = this.model.find({ exercise: { _id: id } })
            return updatedExercise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}