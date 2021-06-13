import { Request, Response } from 'express';
import path from 'path';
import { ICourseRepository } from '../../../interfaces/repositories/ICourseRepository';
import { BaseController } from '../../BaseController';
import ffmpeg from 'fluent-ffmpeg';

export class IntroUploadController extends BaseController {
  private courseRepository: ICourseRepository;

  private files: {
    coursePoster: string;
    introductoryVideo: {
      LOW: string;
      SD: string;
      HD: string;
    };
  };

  constructor(courseRepository: ICourseRepository) {
    super();
    this.files = {
      coursePoster: '',
      introductoryVideo: {
        LOW: '',
        SD: '',
        HD: '',
      },
    };
    this.courseRepository = courseRepository;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    try {
      let files: any = [];
      let fileKeys = Object.keys(req.files!);
      console.log('fileKeys', fileKeys);
      fileKeys.forEach((key) => {
        files.push(req.files![key]);
      });
      let fileName;
      files.forEach(async (file: any) => {
        fileName = Date.now() + file.name;
        const mimeType = file.mimetype.split('/')[0];
        if (mimeType === 'image') {
          if (this.files.coursePoster !== '')
            return this.forbidden(res, 'You can upload only one picture');
          file.mv(
            `${path.dirname(
              require.main?.filename!
            )}/upload/intro/poster/${fileName}`,
            (err: any) => {
              if (err) {
                this.fail(res, err);
              }
            },
            (this.files.coursePoster = `/intro/poster/${fileName}`)
          );
        } else if (mimeType == 'video') {
          if (this.files.introductoryVideo.HD != '')
            return this.forbidden(res, 'You can upload only one intro video');
          file.mv(
            `${path.dirname(
              require.main?.filename!
            )}/upload/intro/video/${fileName}`,
            (err: any) => {
              if (err) {
                this.fail(res, err);
              }
            },
            ((this.files.introductoryVideo.HD = `/intro/video/${fileName}`),
              (this.files.introductoryVideo.SD = '/intro/video/720p' + fileName),
              (this.files.introductoryVideo.LOW = '/intro/video/480p' + fileName))
          );
        } else {
          return this.forbidden(
            res,
            'Wrong File, Please Upload image and video only'
          );
        }
      });
      this.resolutionConverter(this.files.introductoryVideo.HD, res).then(
        () => {
          console.log('finished');
        }
      );

      return this.ok(res, this.files);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }

  public resolutionConverter = async (filename: any, res: Response) => {
    console.log('this.filename', filename);
    const basename = (str: any) => {
      let base = new String(str).substring(str.lastIndexOf('/') + 1);
      if (base.lastIndexOf('.') != -1) {
        base = base.substring(0, base.lastIndexOf('.'));
      }
      return base;
    };

    const baseName = basename(filename);
    console.log('basename', baseName);

    ffmpeg('src/upload' + filename)
      .output('src/upload/intro/video/480p' + baseName + '.mp4')
      .videoCodec('libx264')
      .size('640x480')
      .format('mp4')

      .output('src/upload/intro/video/720p' + baseName + '.mp4')
      .videoCodec('libx264')
      .size('1280x720')
      .format('mp4')

      .on('error', (err) => {
        console.log('An error occured:' + err.message);
      })
      .on('progress', (progress) => {
        console.log('Frames...' + progress.frames);
      })
      .on('end', () => {
        console.log('Finished Procressing');
      })
      .run();
  };
}
