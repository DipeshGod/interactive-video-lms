import mongoose from 'mongoose';

export interface IUser {
    type: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    verified: boolean;
    isEnterprise: boolean;
    isInstructor: {
        bio: string,
        qualification: string
    }
}

export interface IUserDoc extends mongoose.Document {
    type: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    verified: boolean;
    isEnterprise: boolean;
    isInstructor: {
        bio: string,
        qualification: string
    }
}

export interface IUserModel extends mongoose.Model<IUserDoc> { }