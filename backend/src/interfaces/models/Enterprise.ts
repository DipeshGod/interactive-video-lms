import mongoose from 'mongoose';

export interface IEnterprise {
    name: string;
    admins: [string];
    features: [string];
    courses: [string];
    description: string;
    domain:string;
}

export interface IEnterpriseDoc extends mongoose.Document {
    name: string;
    admins: [string];
    features: [string];
    courses: [string];
    description: string;
    domain:string;
}

export interface IEnterpriseModel extends mongoose.Model<IEnterpriseDoc> { }