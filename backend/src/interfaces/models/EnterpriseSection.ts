import mongoose from "mongoose";

export interface IEnterpriseSection {
  enterprise: string;
  courses: [string];
  name: string;
  users: [string];
}

export interface IEnterpriseSectionDoc extends mongoose.Document {
    enterprise: string;
    courses: [string];
    name: string;
    users: [string];
}

export interface IEnterpriseSectionModel
  extends mongoose.Model<IEnterpriseSectionDoc> {}
