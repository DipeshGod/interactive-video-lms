import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../BaseController";

export class DeleteCourseModuleController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const courseModule = await this.courseModuleRepository.deleteCourseModule(id);
            return this.ok(res, courseModule);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}