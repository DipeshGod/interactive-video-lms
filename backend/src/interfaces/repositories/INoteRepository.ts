import { Query } from "mongoose";
import { INote } from "../models/Notes";

export interface INoteRepository {
  createNote(noteData: INote): any;
  getNoteById(noteId: string): any;
  getNote(moduleId: string): any;
}
