import winston from 'winston';
import { join } from 'path';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const messageFormat = printf(
	({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
);

const logs_path = join(process.cwd(), '/logs');

const logger = createLogger({
	level: 'info',
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		messageFormat
	),
	transports: [
		new transports.File({ filename: `${logs_path}/error.log`, level: 'error' }),
		new transports.File({ filename: `${logs_path}/combined.log` }),
		new transports.File({ filename: `${logs_path}/debug.log`, level: 'debug' }),
	],
});

logger.add(
	new transports.Console({
		format: format.combine(format.colorize(), messageFormat),
	})
);

global.logger = logger;

export default logger;
