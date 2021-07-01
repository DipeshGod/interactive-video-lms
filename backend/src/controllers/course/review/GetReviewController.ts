import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/repositories/ICourseRepository";
import { BaseController } from "../../BaseController";

export class GetReviewController extends BaseController {
    private courseRepository: ICourseRepository

    constructor(courseRepository: ICourseRepository) {
        super();
        this.courseRepository = courseRepository;

    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const reviews = this.courseRepository.getCourseById(req.params.id)
            return this.ok(res, reviews);
        } catch (err: any) {
            throw this.fail(res, err);
        }
    }
}