import { Query } from "mongoose";
import { IReview, IReviewDoc, IReviewModel } from "../interfaces/models/Review";
import { IReviewRepository } from "../interfaces/repositories/IReviewRepository";

export class ReviewRepository implements IReviewRepository {
    private reviewModel: IReviewModel;

    constructor(reviewModel: IReviewModel) {
        this.reviewModel = reviewModel
    }

    public createReview(reviewData: IReview): Promise<IReviewDoc> {
        try {
            const review = new this.reviewModel(reviewData).save();
            return review;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getReview(id: string): Query<IReviewDoc[], IReviewDoc, {}> {
        try {
            const reviews = this.reviewModel.find({ course: id }).populate('user');;
            return reviews;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public checkUser(user: string, course: string): Query<IReviewDoc[], IReviewDoc, {}> {
        try {
            const userAlreadyExists = this.reviewModel.find({ user: user, course: course });
            return userAlreadyExists;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}