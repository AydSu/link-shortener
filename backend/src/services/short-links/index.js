import {appDb} from "../../lib/mongodb"
import {getShortLinksCollection} from "../../models/short-link.model"
import { randomUUID } from 'crypto';
import Boom from "@hapi/boom";

/**
 * @param {{ longLink: string; userId: string}} payload
 */
export async function createShortLink(payload,{db}){
    const shortLinksCollection = getShortLinksCollection(appDb.db);
    const shortLink = randomUUID();
    await shortLinksCollection.insertOne({userId: payload.userId, longLink: payload.longLink, shortLink})
    return shortLink;
}

/**
 * @param {{ shortLink: string; userId: string}} payload
 */
export async function getLongLinkByShortLink(payload){
    const shortLinksCollection = getShortLinksCollection(appDb.db)
    const shortLinkDoc = await shortLinksCollection.findOne({userId: payload.userId, shortLink: payload.shortLink})
    if (!shortLinkDoc) throw Boom.notFound('Short link not found')
    return shortLinkDoc.longLink
}

/**
 * @param {{shortLink: string, longLink: string, userId:string}} payload
 * @param {{redis: import("ioredis").Redis;}} utils
 */
export async function cacheLongLinkByShortLink(payload, {redis}){
    await redis.set(`${payload.userId}:${payload.shortLink}`, payload.longLink, "EX", 3600);
}

/**
 * @param {{shortLink: string, userId:string}} payload
 * @param {{redis: import("ioredis").Redis;}} utils
 */
export async function getCachedLongLinkByShortLink(payload, {redis}){
    const longLink = await redis.get(`${payload.userId}:${payload.shortLink}`);
    return longLink
}