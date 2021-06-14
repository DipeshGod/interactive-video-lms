import { Request, Response } from "express";
import path from "path";
import { ICourseModuleRepository } from "../../../interfaces/repositories/ICourseModuleRepository";
import { resolutionConverter } from "../../../services/ffmpeg";
import { BaseController } from "../../BaseController";


export class UploadCourseModuleController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository;

    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;

    }
    protected async executeImpl(req: Request, res: Response) {
        try {
            let videos: any[] = [];
            let files: any = [];
            let totalVideo = 0;
            let fileKeys = Object.keys(req.files!);
            fileKeys.forEach((key) => {
                files.push(req.files![key])
                totalVideo += 1;
            });
            if (totalVideo > 3) return this.forbidden(res, 'You cannot upload more than 3 video');
            let fileName;
            files.forEach((file: any) => {
                const videoTitle = file.name.split('.mp4')[0];
                fileName = Date.now() + file.name;
                if (file.mimetype.split('/')[0] !== 'video')
                    return this.forbidden(res, 'You can only upload video');
                file.mv(`${path.dirname(require.main?.filename!)}/upload/course/${fileName}`,
                    (err: any) => {
                        if (err)
                            return this.fail(res, err.toString());
                    }
                );

                videos.push({
                    title: videoTitle,
                    HD: `/course/${fileName}`,
                    SD: `/course/720p${fileName}`,
                    LOW: `/course/480p${fileName}`
                })
                resolutionConverter(`/course/${fileName}`, 'src/upload', 'src/upload/course');
            })
            return this.ok(res, videos);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }


}
