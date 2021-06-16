
import { Request, Response } from "express";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../BaseController";

export class CreateCourseModuleController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository;

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response){
        try {
            const courseModule = await this.courseModuleRepository.createCourseModule(req.body);
            console.log('req.body',req.body)
            return this.ok(res, courseModule);
        } catch (err: any) {
            return this.fail(res, err.toString());
        }
    }
}