import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../../BaseController";

export class GetExerciseController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const exercises = await this.courseModuleRepository.getCourseModuleByModuleId(req.params.id);
            if (!exercises) return this.fail(res, 'cannot find any module with given id');
            return this.ok(res, exercises);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}