import { Request, Response } from "express";
import { INoteRepository } from "../../interfaces/repositories/INoteRepository";
import { BaseController } from "../BaseController";

export class CreateNoteController extends BaseController {
  private NoteRepository: INoteRepository;

  constructor(NoteRepository: INoteRepository) {
    super();
    this.NoteRepository = NoteRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const qna = await this.NoteRepository.createNote(req.body);
      return this.ok(res, qna);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
