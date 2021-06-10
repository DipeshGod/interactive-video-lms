import joi from 'joi';
import { maxHeaderSize } from 'node:http';

export const courseValidator = async (data: any) => {
    const courseSchema = joi.object({
        name: joi.string()
            .min(5)
            .max(30)
            .required(),

        description: joi.string()
            .alphanum()
            .min(10)
            .required(),

        category: joi.string()
            .alphanum()
            .required(),

        features: joi.array()
            .required(),

        goals: joi.array()
            .required(),

        instructors: joi.array()
            .required(),

        price: joi.number()
            .required(),

        coursePoster: joi.string()
            .required(),

        introductoryVideo: joi.object({
            LOW: joi.string()
                .required(),

            SD: joi.string()
                .required(),

            HD: joi.string()
                .required()
        })
    })

    return await courseSchema.validateAsync(data);
}