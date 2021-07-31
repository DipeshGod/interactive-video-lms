import { Query } from "mongoose";
import { INote, INoteDoc } from "../models/Notes";

export interface INoteRepository {
  createNote(noteData: INote): Promise<INoteDoc>;
  getNoteById(noteId: string): Query<INoteDoc | null, INoteDoc, {}>;
  getNote(moduleId: string): Query<INoteDoc[], INoteDoc, {}>;
  deleteNote(id: string): Query<INoteDoc | null, INoteDoc, {}>;
}
