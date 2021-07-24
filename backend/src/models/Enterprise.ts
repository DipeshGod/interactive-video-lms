import mongoose, { Schema } from "mongoose";
import {
  IEnterpriseDoc,
  IEnterpriseModel,
} from "../interfaces/models/Enterprise";

const enterpriseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  admins: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
  features: {
    type: [String],
    enum: ["exercise", "assignment","notes"],
  },
  courses: {
    type: [Schema.Types.ObjectId],
    ref: "course",
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
});

const Enterprise = mongoose.model<IEnterpriseDoc, IEnterpriseModel>(
  "enterprise",
  enterpriseSchema
);

export { Enterprise };
