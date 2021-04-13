import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT || 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	logging: false,
});

export default (async function () {
	try {
		await sequelize.authenticate();
		logger.info('Подключение к базе успешно выполнено');

		require('@/models/index');

		await sequelize.sync();
		logger.info('Таблицы успешно синхронизированы');
	} catch (error) {
		logger.error(`Не удалось подключить к базе данных: ${error.message}`);
		process.exit(0);
	}
});
