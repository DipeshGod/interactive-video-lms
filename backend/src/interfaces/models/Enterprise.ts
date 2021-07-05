import mongoose from 'mongoose';

export interface IEnterprise {
    name: string;
    users: [string];
    admins: [string];
    features: [string];
}

export interface IEnterpriseDoc extends mongoose.Document {
    name: string;
    users: [string];
    admins: [string];
    features: [string];
}

export interface IEnterpriseModel extends mongoose.Model<IEnterpriseDoc> { }