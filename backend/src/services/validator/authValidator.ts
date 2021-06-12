import joi from 'joi';

export const loginValidator = async (data: any) => {

    const loginSchema = joi.object({
        email: joi.string()
            .email({ minDomainSegments: 2, /* tlds: { allow: ['com', 'net', '.edu.np'] }  */ })
            .required(),

        password: joi.string()
            .pattern(new RegExp('^[a-zA-z0-9]{8,15}$'))
            .required(),
    })
    return await loginSchema.validateAsync(data);
}

export const registerValidator = async (data: any) => {
    const registerSchema = joi.object({
        name: joi.string()
            .min(5)
            .max(30)
            .required(),

        email: joi.string()
            .email({ minDomainSegments: 2,/*  tlds: { allow: ['com', 'net', '.edu.np'] }  */ })
            .required(),

        password: joi.string()
            .pattern(new RegExp('^[a-zA-z0-9]{8,15}$'))
            .required(),

        profilePicture: joi.string()
            .alphanum(),

        verified: joi.boolean(),

        isEnterprise: joi.string(),

        type: joi.string()
    })

    return await registerSchema.validateAsync(data);
}

export const resetPasswordValidator = async (data: any) => {
    const resetPasswordSchema = joi.object({
        email: joi.string()
            .email({ minDomainSegments: 2,/*  tlds: { allow: ['com', 'net', '.edu.np'] }  */ })
            .required(),

        password: joi.string()
            .pattern(new RegExp('^[a-zA-z0-9]{8,15}$'))
            .required(),
    })

    return await resetPasswordSchema.validateAsync(data);
}