import { createClient } from 'redis';
import { logger } from '../logger';

export class Redis{
    client;
    logger;
    /**
     * Creates Redis instance
     * @param {number} dbNumber - dbNumber
     * @param {import("winston").Logger} logger
     */
    constructor(dbNumber, logger){
        this.logger = logger;
        const connectionUrl = `redis://localhost:6379/${dbNumber}`
        this.client = createClient({url: connectionUrl, legacyMode: true});
        this.client.on('error', err => this.logger.error('Redis Client Error', err));
        this.client.on('connect', res => this.logger.debug(`[REDIS] Connected to ${connectionUrl}`, res));
    }

    async connect(){
        await this.client.connect();
    }

    async close(){
        await this.client.disconnect();
    }
}

export const redis = new Redis(10, logger);