import mongoose from "mongoose";
export interface INote {
  courseModule: string;
  title: string;
  body: any;
}

export interface INoteDoc extends mongoose.Document {
  courseModule: string;
  title: string;
  body: any;
}

export interface INoteModel extends mongoose.Model<INoteDoc> {}
