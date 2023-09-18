import Boom from "@hapi/boom"
import {cacheLongLinkByShortLink, getLongLinkByShortLink} from "../../services/short-links"
import {getCachedLongLinkByShortLink} from '../../services/short-links/index'
import {redis} from '../../lib/redis'
import { logger } from "../../lib/logger";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function shortLinkRedirectController(req, res){
    try{
        const userId = req.cookies.userId;
        if (!userId) throw Boom.methodNotAllowed('Not found userId');

        if (!req.params.shortLink) throw Boom.badRequest();

        let longLink = await getCachedLongLinkByShortLink({userId, shortLink: req.params.shortLink}, {redis})
        if (!longLink){
            logger.debug('No short link found in cache');
            const longLink = (await getLongLinkByShortLink({userId, shortLink: req.params.shortLink}))          
            await cacheLongLinkByShortLink({shortLink: req.params.shortLink, longLink, userId}, {redis})
        }
        if (longLink && longLink.length){
            res.redirect(301, longLink)        
        }else{
            throw Boom.notFound();
        }
    } catch(e){
        if (Boom.isBoom(e)){
            return res.status(e.output.statusCode).json(e.output.payload)
        } else return res.status(500).send(e.message)
    }
}