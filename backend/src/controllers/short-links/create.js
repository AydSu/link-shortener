import Joi from "joi";
import Boom from "@hapi/boom"
import {shortLinkCreationRequestSchema} from "../../services/short-links/validate-create-req";
import {createShortLink} from  "../../services/short-links"
import { appDb } from "../../lib/mongodb";
import {cacheLongLinkByShortLink} from "../../services/short-links/index"
import {redis} from "../../lib/redis"
import { logger } from "../../lib/logger";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function shortLinkCreateController(req, res){
    try{
        const userId = req.cookies.userId;
        if (!userId) throw Boom.methodNotAllowed('Not found userId');

        const value = shortLinkCreationRequestSchema.validate(req.body)
        if (value.error){
            throw Boom.badRequest(value.error)
        }

        const shortLink = await createShortLink({userId, longLink: req.body.longLink}, {db: appDb})
        await cacheLongLinkByShortLink({shortLink, longLink: req.body.longLink, userId}, {redis})

        return res.json({shortLink})
    } catch(e){
        logger.error(e)
        if (Boom.isBoom(e)){
            return res.status(e.output.statusCode).json(e.output.payload)
        } else return res.status(500).send(e)
    }
}