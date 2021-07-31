import mongoose, { Schema } from "mongoose";
import { INoteModel, INoteDoc } from "../interfaces/models/Notes";

const noteSchema = new mongoose.Schema({
  courseModule: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "coursemodule",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Note = mongoose.model<INoteDoc, INoteModel>("note", noteSchema);
export { Note };
