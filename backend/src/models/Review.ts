import mongoose, { Schema } from 'mongoose';
import { IReviewDoc, IReviewModel } from '../interfaces/models/Review';

const reviewSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    }
});

const Review = mongoose.model<IReviewDoc, IReviewModel>('review', reviewSchema);

export { Review };