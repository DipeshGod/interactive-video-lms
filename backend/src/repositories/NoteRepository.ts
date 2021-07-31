import { INote, INoteModel } from '../interfaces/models/Notes';
import { INoteRepository } from '../interfaces/repositories/INoteRepository';

export class NoteRepository implements INoteRepository {
  private model: INoteModel;

  constructor(NoteModel: INoteModel) {
    this.model = NoteModel;
  }
  createNote(noteData: INote) {
    try {
      const note = new this.model({
        courseModule: noteData.courseModule,
        title: noteData.title,
        body: noteData.body,
      });
      return note.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
  getNoteById(noteId: string) {
    try {
      const note = this.model.findById(noteId);
      return note;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
  getNote(moduleId: string) {
    try {
      const note = this.model.find({ courseModule: moduleId });
      return note;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
