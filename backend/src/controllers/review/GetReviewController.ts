import { Request, Response } from "express";
import { IReviewRepository } from "../../interfaces/repositories/IReviewRepository";
import { BaseController } from "../BaseController";

export class GetReviewController extends BaseController {
    private reviewRepository: IReviewRepository

    constructor(reviewRepository: IReviewRepository) {
        super();
        this.reviewRepository = reviewRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const review = await this.reviewRepository.getReview(req.params.id);
            return this.ok(res, review);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}