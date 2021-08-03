import mongoose, { Schema } from "mongoose";
import {
  IUserEnrolledModel,
  IUserEnrolledDoc,
} from "../interfaces/models/UserEnrolled";

const userEnrolledSchema = new mongoose.Schema({
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
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  currentChapter: {
    type: String,
  },
  currentVideo: {
    type: String,
  },
});

const UserEnrolled = mongoose.model<IUserEnrolledDoc, IUserEnrolledModel>(
  "userenrolled",
  userEnrolledSchema
);

export { UserEnrolled };
