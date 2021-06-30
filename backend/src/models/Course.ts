import mongoose, { Schema } from 'mongoose';
import { ICourse, ICourseDoc, ICourseModel } from '../interfaces/models/Course';

const introVideoSchema = new mongoose.Schema({
  LOW: String,
  SD: String,
  HD: String,
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comment: String,
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  }
})

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    goals: {
      type: [String],
      required: true,
    },
    introductoryVideo: {
      LOW: String,
      SD: String,
      HD: String
    },
    instructors: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coursePoster: {
      type: String,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: true
    },
    review: [reviewSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model<ICourseDoc, ICourseModel>('Course', courseSchema);

export { Course };
