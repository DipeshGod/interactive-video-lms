import { Query } from 'mongoose';
import {
  IEnterpriseSection,
  IEnterpriseSectionDoc,
  IEnterpriseSectionModel,
} from '../interfaces/models/EnterpriseSection';
import { IEnterpriseSectionRepository } from '../interfaces/repositories/IEnterpriseSectionRepository';

export class EnterpriseSectionRepository
  implements IEnterpriseSectionRepository
{
  private model: IEnterpriseSectionModel;

  constructor(model: IEnterpriseSectionModel) {
    this.model = model;
  }

  public createEnterpriseSection(
    enterpriseData: IEnterpriseSection
  ): Promise<IEnterpriseSectionDoc> {
    try {
      const enterprise = new this.model(enterpriseData);
      return enterprise.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public getEnterpriseSection(
    id: string
  ): Query<IEnterpriseSectionDoc[] | null, IEnterpriseSectionDoc, {}> {
    try {
      const enterprise = this.model
        .find({ enterprise: id })
        .populate({ path: 'users', select: 'name email password' });

      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public editEnterpriseSection(
    id: string,
    enterpriseData: IEnterpriseSection
  ): Query<IEnterpriseSectionDoc | null, IEnterpriseSectionDoc, {}> {
    try {
      const enterprise = this.model.findByIdAndUpdate(id, enterpriseData, {
        new: true,
      });
      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public deleteEnterpriseSection(
    id: string
  ): Query<IEnterpriseSectionDoc | null, IEnterpriseSectionDoc, {}> {
    try {
      const enterprise = this.model.findByIdAndRemove(id);
      return enterprise;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
