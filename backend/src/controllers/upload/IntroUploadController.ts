import { Request, Response } from "express";
import path from "path";
import { ICourseRepository } from "../../interfaces/repositories/ICourseRepository";
import { BaseController } from "../BaseController";
import { resolutionConverter } from "../../services/ffmpeg";

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
      coursePoster: "",
      introductoryVideo: {
        LOW: "",
        SD: "",
        HD: "",
      },
    };
    this.courseRepository = courseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      let files: any = [];
      let fileKeys = Object.keys(req.files!);
      fileKeys.forEach((key) => {
        files.push(req.files![key]);
      });
      let fileName;
      files.forEach(async (file: any) => {
        fileName = Date.now() + file.name;
        const mimeType = file.mimetype.split("/")[0];
        if (mimeType === "image") {
          if (this.files.coursePoster !== "")
            return this.forbidden(res, "You can upload only one picture");
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
        } else if (mimeType == "video") {
          if (this.files.introductoryVideo.HD != "")
            return this.forbidden(res, "You can upload only one intro video");
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
            (this.files.introductoryVideo.SD = "/intro/video/720p" + fileName),
            (this.files.introductoryVideo.LOW = "/intro/video/480p" + fileName))
          );
        } else {
          return this.forbidden(
            res,
            "Wrong File, Please Upload image and video only"
          );
        }
      });
      resolutionConverter(
        this.files.introductoryVideo.HD,
        "src/upload",
        "src/upload/intro/video"
      );
      return this.ok(res, this.files);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
