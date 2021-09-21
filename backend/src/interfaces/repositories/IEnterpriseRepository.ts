import { Query } from 'mongoose';
import { IEnterprise, IEnterpriseDoc } from '../models/Enterprise';

export interface IEnterpriseRepository {
  createEnterprise(enterpriseData: IEnterprise): Promise<IEnterpriseDoc>;
  getEnterprise(): Query<IEnterpriseDoc[], IEnterpriseDoc, {}>;
  getEnterpriseById(
    id: string
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}>;
  editEnterprise(
    id: string,
    enterpriseData: IEnterprise
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}>;
  deleteEnterprise(
    id: string
  ): Query<IEnterpriseDoc | null, IEnterpriseDoc, {}>;
}
