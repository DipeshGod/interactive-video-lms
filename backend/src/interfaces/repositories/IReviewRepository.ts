import { Query } from "mongoose";
import { IReview, IReviewDoc } from "../models/Review";

export interface IReviewRepository {
    createReview(reviewData: IReview): Promise<IReviewDoc>;
    getReview(id: string): Query<IReviewDoc[], IReviewDoc, {}>;
    checkUser(user: string, course: string): Query<IReviewDoc[], IReviewDoc, {}>;
}