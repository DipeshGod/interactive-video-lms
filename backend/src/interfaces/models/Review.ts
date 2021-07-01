import mongoose from 'mongoose';

export interface IReview {
    course: string;
    user: string;
    comment: string;
    rating: number;
}

export interface IReviewDoc extends mongoose.Document {
    course: string;
    user: string;
    comment: string;
    rating: number;
}

export interface IReviewModel extends mongoose.Model<IReviewDoc> { }