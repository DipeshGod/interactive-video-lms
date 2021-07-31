import { Request, Response } from 'express';
import { INoteRepository } from '../../interfaces/repositories/INoteRepository';
import { BaseController } from '../BaseController';

export class GetNoteByIdController extends BaseController {
  private NoteRepository: INoteRepository;

  constructor(NoteRepository: INoteRepository) {
    super();
    this.NoteRepository = NoteRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const note = await this.NoteRepository.getNoteById(req.params.id);
      return this.ok(res, note);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
