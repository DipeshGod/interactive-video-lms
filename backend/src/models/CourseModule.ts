import mongoose from 'mongoose';
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    videos: {
      type: [String],
      required: true,
    },
    assignments: {
      type: [String],
    },
    quiz: {
      type: [String],
    },
  },
  { timestamps: true }
);

const CourseModule = mongoose.model<ICourseModuleDoc, ICourseModuleModel>(
  'CourseModule',
  courseModuleSchema
);

export { CourseModule };
