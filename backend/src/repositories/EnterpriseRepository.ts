import { Query } from 'mongoose';
import {
  IEnterprise,
  IEnterpriseDoc,
  IEnterpriseModel,
} from '../interfaces/models/Enterprise';
import { IEnterpriseRepository } from '../interfaces/repositories/IEnterpriseRepository';

export class EnterpriseRepository implements IEnterpriseRepository {
  private model: IEnterpriseModel;

  constructor(model: IEnterpriseModel) {
    this.model = model;
  }

  getEnterpriseById(
    id: string
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}> {
    try {
      const enterprise = this.model.findById(id).populate('courses');
      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public createEnterprise(
    enterpriseData: IEnterprise
  ): Promise<IEnterpriseDoc> {
    try {
      const enterprise = new this.model(enterpriseData);
      return enterprise.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getEnterprise(): Query<IEnterpriseDoc[], IEnterpriseDoc, {}> {
    try {
      const enterprises = this.model.find({});
      return enterprises;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editEnterprise(
    id: string,
    enterpriseData: IEnterprise
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}> {
    try {
      const enterprise = this.model.findByIdAndUpdate(id, enterpriseData, {
        new: true,
      });
      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public deleteEnterprise(
    id: string
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}> {
    try {
      const enterprise = this.model.findByIdAndRemove(id);
      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
