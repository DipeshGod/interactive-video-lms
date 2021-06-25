import mongoose from 'mongoose';
import { ICourse, ICourseDoc, ICourseModel } from '../interfaces/models/Course';

const introVideoSchema = new mongoose.Schema({
  LOW: String,
  SD: String,
  HD: String,
});

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
      type: introVideoSchema,
      required: true,
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
    }
  },
  { timestamps: true }
);

const Course = mongoose.model<ICourseDoc, ICourseModel>('Course', courseSchema);

export { Course };
