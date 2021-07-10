import mongoose, { Schema } from 'mongoose';
import {
  ICourseModuleDoc,
  ICourseModuleModel,
} from '../interfaces/models/CourseModule';

const courseModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    videos: {
      type: [{
        title: String,
        LOW: String,
        SD: String,
        HD: String
      }],
    },
    hasExercise: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const CourseModule = mongoose.model<ICourseModuleDoc, ICourseModuleModel>(
  'CourseModule',
  courseModuleSchema
);

export { CourseModule };
