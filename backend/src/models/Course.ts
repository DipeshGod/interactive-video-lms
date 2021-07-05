import mongoose, { Schema } from 'mongoose';
import { ICourse, ICourseDoc, ICourseModel } from '../interfaces/models/Course';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    association: {
      type: mongoose.Types.ObjectId,
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
    },
    isFree: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);
/* Created by: ref:user */
const Course = mongoose.model<ICourseDoc, ICourseModel>('course', courseSchema);

export { Course };
