import mongoose from 'mongoose';

export interface IResetPassword {
    email: string;
    code: string;
    createdAt: Date;
}

export interface IResetPasswordDoc extends mongoose.Document {
    email: string;
    code: string;
    createdAt: Date;
}

export interface IResetPasswordModel extends mongoose.Model<IResetPasswordDoc> { }