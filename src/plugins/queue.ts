import { connect, Connection } from 'amqplib';

export let connection!: Connection;

export default async function start() {
	try {
		connection = await connect({
			hostname: process.env.QUEUE_HOST,
			port: +process.env.QUEUE_PORT,
			username: process.env.QUEUE_USER,
			password: process.env.QUEUE_PASS,
			heartbeat: +process.env.QUEUE_HEARTBEAT,
		});
		logger.info('Подключение [QUEUE] успешно установлено!');

		connection.on('error', (error) => {
			logger.error('[QUEUE] Error');
			logger.error(error);
		});
		connection.on('close', () => {
			logger.warn('[QUEUE] Closed connection');
			return setTimeout(start, +process.env.QUEUE_TIMEOUT_RECONNECT);
		});
	} catch (error) {
		logger.error(error.message);
		setTimeout(start, +process.env.QUEUE_TIMEOUT_RECONNECT);
	}
}
