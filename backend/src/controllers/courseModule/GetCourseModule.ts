import { Request, Response } from "express";
import { any } from "joi";
import { memoryUsage } from "node:process";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { BaseController } from "../BaseController";

export class GetCourseModule extends BaseController {
    private courseModuleRepository: ICourseModuleRepository
    constructor(courseModuleRepository: ICourseModuleRepository) {
        super();
        this.courseModuleRepository = courseModuleRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const modules = await this.courseModuleRepository.getCourseModuleById(id);
            let data: any = []
            modules.forEach((module: any) => {
                let titles: any = [];
                module.videos.forEach((video: any) => {
                    titles.push(video.HD.split('. ')[1].split('.mp4')[0])
                })
                console.log('modules', module)
                data.push({module:module, subtitles: titles })
            })
            return this.ok(res, data);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}