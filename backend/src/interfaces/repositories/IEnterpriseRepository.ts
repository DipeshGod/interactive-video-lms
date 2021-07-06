import { IEnterprise } from "../models/Enterprise";

export interface IEnterpriseRepository {
    createEnterprise(enterpriseData: IEnterprise): any;
    getEnterprise(id: string): any;
    editEnterprise(id: string, enterpriseData: IEnterprise): any;
    deleteEnterprise(id: string): any;
}