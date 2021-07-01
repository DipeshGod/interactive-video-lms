import { IReview, IReviewModel } from "../interfaces/models/Review";
import { IReviewRepository } from "../interfaces/repositories/IReviewRepository";

export class ReviewRepository implements IReviewRepository {
    private reviewModel: IReviewModel;

    constructor(reviewModel: IReviewModel) {
        this.reviewModel = reviewModel
    }

    public createReview(reviewData: IReview): any {
        try {
            const review = new this.reviewModel(reviewData).save();
            return review;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getReview(id: string): any {
        try {
            const reviews = this.reviewModel.find({ course: id });
            return reviews;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public checkUser(user: string, course: string): any {
        try {
            const userAlreadyExists = this.reviewModel.find({ user: user, course: course });
            return userAlreadyExists;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}