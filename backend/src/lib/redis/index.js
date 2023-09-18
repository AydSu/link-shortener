import IORedis from 'ioredis'
import { logger } from '../logger';

export function createRedisClient({logger}) {

  const redis = new IORedis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    // username: "default", // needs Redis >= 6
    // password: "my-top-secret",
    db: 10, // Defaults to 0
  });

  redis.on("error", (err) => logger.error(`[REDIS] Error ${err}`))
  redis.on("connect", (res) => logger.debug('[REDIS] Connected'))

  return redis
}

export const redis = createRedisClient({logger});