import { Request, Response } from "express";
import { IEnterpriseSectionRepository } from "../../interfaces/repositories/IEnterpriseSectionRepository";
import { BaseController } from "../BaseController";

export class CreateEnterpriseSectionController extends BaseController {
    private enterpriseSectionRepository: IEnterpriseSectionRepository;

    constructor(enterpriseSectionRepository: IEnterpriseSectionRepository) {
        super();
        this.enterpriseSectionRepository = enterpriseSectionRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const enterpriseSection = await this.enterpriseSectionRepository.createEnterpriseSection(req.body);
            return this.ok(res, enterpriseSection);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}