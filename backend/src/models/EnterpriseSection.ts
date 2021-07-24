import mongoose, { Schema } from "mongoose";
import {
  IEnterpriseSectionDoc,
  IEnterpriseSectionModel,
} from "../interfaces/models/EnterpriseSection";

const enterpriseSectionSchema = new Schema({
  enterprise: {
    type: Schema.Types.ObjectId,
    ref: "enterprise",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const EnterpriseSection = mongoose.model<
  IEnterpriseSectionDoc,
  IEnterpriseSectionModel
>("enterpriseSection", enterpriseSectionSchema);

export { EnterpriseSection };
