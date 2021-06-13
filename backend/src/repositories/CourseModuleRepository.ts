import { ICourseModule, ICourseModuleModel } from "../interfaces/models/CourseModule";
import { ICourseModuleRepository } from "../interfaces/repositories/ICourseModuleRepository";
import {ICourseModuleDoc} from './../interfaces/models/CourseModule';

export class CourseModuleRepository implements ICourseModuleRepository {
    private model: ICourseModuleModel;

    constructor(model: ICourseModuleModel) {
        this.model = model;
    }

    public createCourseModule(courseModuleData: ICourseModule):Promise<ICourseModuleDoc> {
        try {
            let courseModule = new this.model(courseModuleData);
            return courseModule.save();
        } catch (err: any) {
            throw new Error("Couldn't create course module");
        }
    }
}