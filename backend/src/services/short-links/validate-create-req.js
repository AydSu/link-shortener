import Joi from "joi"

export const shortLinkCreationRequestSchema = Joi.object({
    longLink: Joi.string().required(), 
})

// console.log(schema.validate({longLink: "strr"}))
// shortLinkCreationRequestSchema.validate({longLink: "strr"})


// Joi.assert({longLink: "strr"}, shortLinkCreationRequestSchema, new Error('ERRRR'))