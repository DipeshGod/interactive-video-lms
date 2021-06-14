import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../BaseController";

export class GetCourseModule extends BaseController {
    private courseModuleRepository: ICourseModuleRepository
    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const modules = await this.courseModuleRepository.getCourseModuleById(id);
            return this.ok(res, modules);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}