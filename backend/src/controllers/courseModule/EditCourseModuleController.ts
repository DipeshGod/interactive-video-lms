import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../BaseController";

export class EditCourseModuleController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository;

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const courseModule = await this.courseModuleRepository.editCourseModule(id, req.body);
            return this.ok(res, courseModule);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}