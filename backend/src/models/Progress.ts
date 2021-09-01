import mongoose, { Schema } from "mongoose";
import {
  IStudentProgressDoc,
  IStudentProgressModel,
} from "../interfaces/models/Progress";

const moduleProgressSchema = new mongoose.Schema({
  // id: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'course',
  // },
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  solvedQuestions: {
    type: Number,
    min: 0,
    default: 0,
  },
  totalQuestions: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    preTestScore: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      solvedQuestions: {
        type: Number,
        min: 0,
        default: 0,
      },
      totalQuestions: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    finalTestScore: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      solvedQuestions: {
        type: Number,
        min: 0,
        default: 0,
      },
      totalQuestions: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    moduleProgress: [
      {
        type: moduleProgressSchema,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const StudentProgress = mongoose.model<
  IStudentProgressDoc,
  IStudentProgressModel
>("progress", progressSchema);

/* const ModuleProgress = mongoose.model<IModuleProgressDoc, IModuleProgressModel>(
  'moduleprogress',
  moduleProgressSchema
); */
export { StudentProgress };
