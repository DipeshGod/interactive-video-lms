import { Request, Response } from 'express';
import path from 'path';
import { ICourseModuleRepository } from '../../../../interfaces/repositories/ICourseModuleRepository';
import { BaseController } from '../../../BaseController';

export class VideoUploadController extends BaseController {
  private courseModuleRepository: ICourseModuleRepository;

  constructor(courseModuleRepository: ICourseModuleRepository) {
    super();
    this.courseModuleRepository = courseModuleRepository;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    try {
      let files: any = [];
      let fileKeys = Object.keys(req.files!);
      fileKeys.forEach((key) => {
        files.push(req.files![key]);
      });

      files.forEach(async (file: any) => {
        file.mv(
          `${path.dirname(require.main?.filename!)}/upload/video/${file.name}`,
          (err: any) => {
            if (err) {
              this.fail(res, err);
            }
          }
        );
      });

      return this.created(res);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}
