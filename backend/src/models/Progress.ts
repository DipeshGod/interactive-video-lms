import mongoose, { Schema } from "mongoose";
import {
  IStudentProgressDoc,
  IStudentProgressModel,
} from "../interfaces/models/Progress";

const moduleProgressSchema = new mongoose.Schema({
  module: {
    type: Schema.Types.ObjectId,
    ref: "CourseModule",
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
    preTest: {
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
    finalTest: {
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

export { StudentProgress };
