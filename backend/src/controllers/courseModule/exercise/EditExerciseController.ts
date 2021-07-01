import { Request, Response } from "express";
import { ICourseModuleModel } from "../../../interfaces/models/CourseModule";
import { ICourseModuleRepository } from "../../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../../BaseController";

export class EditExerciseController extends BaseController {
    courseModuleRepository: ICourseModuleRepository

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedCourseModule = await this.courseModuleRepository.editExercise(id);
            console.log('updated ', updatedCourseModule);
            return this.ok(res, updatedCourseModule);
        } catch (err: any) {
            return this.fail(res, err.toString());
        }
    }
}