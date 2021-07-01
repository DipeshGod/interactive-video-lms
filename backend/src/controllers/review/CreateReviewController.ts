import { Request, Response } from "express";
import { IReviewRepository } from "../../interfaces/repositories/IReviewRepository";
import { BaseController } from "../BaseController";

export class CreateReviewController extends BaseController {
    private reviewRepository: IReviewRepository

    constructor(reviewRepository: IReviewRepository) {
        super();
        this.reviewRepository = reviewRepository
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const userAlreadyExists = await this.reviewRepository.checkUser(req.body.user, req.body.course);
            console.log('userAlready:', userAlreadyExists);
            if (userAlreadyExists.length === 1) return this.forbidden(res, 'You have already comment for this course');
            const review = await this.reviewRepository.createReview(req.body);
            if (!review) return this.forbidden(res, 'Cannot create review, try again');
            return this.ok(res, review);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}