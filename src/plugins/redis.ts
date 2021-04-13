import redis from 'redis';
import session, { SessionOptions } from 'express-session';

import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
	host: process.env.REDIS_HOST,
	port: +(process.env.REDIS_PORT || 6379),
	password: process.env.REDIS_PASS,
	db: +(process.env.REDIS_DB || 1),
});

const session_options: SessionOptions = {
	store: new RedisStore({
		client: redisClient,
		ttl: +(process.env.REDIS_EX || 3600) * 1000,
		prefix: (process.env.REDIS_PREFIX || 'session') + ':',
	}),
	secret: process.env.APP_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: process.env.NODE_ENV !== 'development',
		maxAge: +(process.env.REDIS_EX || 3600) * 1000,
	},
};

export default session(session_options);
