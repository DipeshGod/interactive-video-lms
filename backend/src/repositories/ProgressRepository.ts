import { IStudentProgress, IStudentProgressModel } from "../interfaces/models/Progress";
import { IProgressRepository } from "../interfaces/repositories/IProgressRepository";

export class ProgressRepository implements IProgressRepository {
    private model: IStudentProgressModel;

    constructor(model: IStudentProgressModel) {
        this.model = model;
    }

    public createProgress(progressData: IStudentProgress): any {
        try {
            let progress = new this.model(progressData);
            return progress.save();
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getProgress(id: string): any {
        try {
            let progress = this.model.find({
                $or: [
                    { courseId: id },
                    { id: id }
                ]
            });
            return progress;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public editProgress(id: string, progressData: IStudentProgress) {
        try {
            const progress = this.model.findOneAndUpdate({ courseId: id }, progressData, { new: true });
            return progress;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public removeProgress(id: string): any {
        try {
            const progress = this.model.findOneAndRemove({ courseId: id });
            return progress;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}