import { Request, Response } from "express";
import { ICourseRepository } from "../../../interfaces/repositories/ICourseRepository";
import { BaseController } from "../../BaseController";

export class CreateReviewController extends BaseController {
    private courseRepository: ICourseRepository

    constructor(courseRepository: ICourseRepository) {
        super();
        this.courseRepository = courseRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const course: any = await this.courseRepository.getCourseById(id);
            if (!course) return this.fail(res, 'Cannot find course with requested id');
            if (!course.review) {
                course.review = req.body;
            } else {
                course.review.push(req.body);
            }
            const updatedCourse = await this.courseRepository.editCourse(id, course);
            if (!updatedCourse) return this.fail(res, 'Cannot update review')
            return this.ok(res, updatedCourse);
        } catch (err: any) {
            return this.fail(res, err.toString());
        }
    }
}