import { IReview } from "../models/Review";

export interface IReviewRepository {
    createReview(reviewData: IReview): any;
    getReview(id: string): any;
    checkUser(user: string, course: string): any;
}