import { Request, Response } from "express";
import { IEnterpriseRepository } from "../../interfaces/repositories/IEnterpriseRepository";
import { BaseController } from "../BaseController";

export class DeleteEnterpriseController extends BaseController {
    private enterpriseRepository: IEnterpriseRepository;

    constructor(enterpriseRepository: IEnterpriseRepository) {
        super();
        this.enterpriseRepository = enterpriseRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const enterprise = await this.enterpriseRepository.deleteEnterprise(id);
            return this.ok(res, enterprise);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}