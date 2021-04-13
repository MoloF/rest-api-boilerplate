import { Logger } from 'winston';

declare global {
	const logger: Logger;
	namespace NodeJS {
		interface Global {
			logger: Logger;
		}
	}
}
