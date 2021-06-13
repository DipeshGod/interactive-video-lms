import { Request, Response } from "express";
import { any } from "joi";
import path from "path";
import { ICourseModuleRepository } from "../../../interfaces/repositories/ICourseModuleRepository";
import { resolutionConverter } from "../../../services/ffmpeg";
import { BaseController } from "../../BaseController";

export class FileObjectClass {
    public LOW: string;
    public SD: string;
    public HD: string;
    constructor() {
        this.LOW = '',
            this.SD = '',
            this.HD = ''
    }
}

export class UploadCourseModuleController extends BaseController {
    private courseModuleRepository: ICourseModuleRepository;

    private files: Array<FileObjectClass>
    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
        this.files = new Array({
            LOW: "",
            SD: "",
            HD: ""
        }, {
            LOW: "",
            SD: "",
            HD: ""
        }, {
            LOW: "",
            SD: "",
            HD: ""
        })
    }
    protected async executeImpl(req: Request, res: Response) {
        try {
            //let totalFiles: [{}] = [{}];
            let files: any = [];
            let totalVideo = 0;
            let fileKeys = Object.keys(req.files!);
            fileKeys.forEach((key) => {
                files.push(req.files![key])
                totalVideo += 1;
            });
            console.log('files', files);
            if (totalVideo > 3) return this.forbidden(res, 'You cannot upload more than 3 video');
            let fileName;
            let i = 0;
            files.forEach(async (file: any) => {
                fileName = Date.now() + file.name;
                if (file.mimetype.split('/')[0] !== 'video')
                    return this.forbidden(res, 'You can only upload video');
                file.mv(`${path.dirname(require.main?.filename!)}/upload/course/${fileName}`,
                    (err: any) => {
                        if (err)
                            return this.fail(res, err.toString());
                    },
                    ((this.files[i].HD = `/course/${fileName}`),
                        (this.files[i].SD = `/course/720p${fileName}`),
                        (this.files[i].LOW = `/course/480p${fileName}`))
                );
                resolutionConverter(this.files[i].HD, 'src/upload', 'src/upload/course');
                i += 1;
            })
            return this.ok(res, this.files);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }


}
