import mongoose from 'mongoose';
import {
  ICourseModuleDoc,
  ICourseModuleModel,
} from '../interfaces/models/CourseModule';

const videoSchema = new mongoose.Schema({
  title: String,
  HD: String,
  SD: String,
  LOW: String
})

const quizSchema = new mongoose.Schema({
  question:String,
  options:[String],
  answer:String

})

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
      type: [videoSchema],
      required: true,
    },
    quizes:{
      type:[quizSchema]
    }
  },
  { timestamps: true }
);

const CourseModule = mongoose.model<ICourseModuleDoc, ICourseModuleModel>(
  'CourseModule',
  courseModuleSchema
);

export { CourseModule };
