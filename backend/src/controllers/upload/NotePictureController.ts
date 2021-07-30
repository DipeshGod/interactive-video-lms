import { Request, Response } from 'express';
import { any } from 'joi';
import path from 'path';
import { BaseController } from '../BaseController';

export class NotePictureUploadController extends BaseController {
  constructor() {
    super();
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const file: any = req.files!.picture;
      const name = file.name.split('.');
      const filename = `${Date.now()}.${file.name.split('.')[name.length - 1]}`;
      if (file.mimetype.split('/')[0] !== 'image')
        return this.forbidden(res, 'You are only allowed to upload image');
      file.mv(
        `${path.dirname(require.main?.filename!)}/upload/editor/${filename}`,
        (err: any) => {
          if (err) {
            return this.fail(res, err);
          }
        }
      );
      return this.ok(res, `/editor/${filename}`);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
