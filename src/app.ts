import './plugins/moduleAlias';
import './plugins/dotenv';
import './plugins/winston';

import sequelize from './plugins/sequelize';
import queue from './plugins/queue';
import express from './plugins/express';

(async () => {
	try {
		await queue();
		await sequelize();
		await express();
	} catch (error) {
		logger.error(error);
	}
})();
