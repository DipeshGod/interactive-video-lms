import { IEnterprise, IEnterpriseModel } from "../interfaces/models/Enterprise";
import { IEnterpriseRepository } from "../interfaces/repositories/IEnterpriseRepository";

export class EnterpriseRepository implements IEnterpriseRepository {
    private model: IEnterpriseModel;

    constructor(model: IEnterpriseModel) {
        this.model = model;
    }

    public createEnterprise(enterpriseData: IEnterprise) {
        try {
            const enterprise = new this.model(enterpriseData);
            return enterprise.save();
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public getEnterprise(id: string) {
        try {
            const enterprise = this.model.findById(id);
            return enterprise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public editEnterprise(id: string, enterpriseData: IEnterprise) {
        try {
            const enterprise = this.model.findByIdAndUpdate(id, enterpriseData, {
                new: true
            })
            return enterprise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }

    public deleteEnterprise(id: string) {
        try {
            const enterprise = this.model.findByIdAndRemove(id);
            return enterprise;
        } catch (err: any) {
            throw new Error(err.toString());
        }
    }
}