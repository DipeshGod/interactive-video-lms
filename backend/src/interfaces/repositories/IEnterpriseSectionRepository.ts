import { Query } from "mongoose";
import { IEnterpriseSection, IEnterpriseSectionDoc } from "../models/EnterpriseSection";

export interface IEnterpriseSectionRepository {
    createEnterpriseSection(enterpriseData: IEnterpriseSection): Promise<IEnterpriseSectionDoc>;
    getEnterpriseSection(id: string): Query<IEnterpriseSectionDoc | null, IEnterpriseSectionDoc, {}>;
    editEnterpriseSection(id: string, enterpriseData: IEnterpriseSection): Query<IEnterpriseSectionDoc | null, IEnterpriseSectionDoc, {}>;
    deleteEnterpriseSection(id: string): Query<IEnterpriseSectionDoc | null, IEnterpriseSectionDoc, {}>;
}