import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { join } from 'path';
import session from './redis';

import routes from '@/routes/';

export const app = express();
const port = process.env.APP_PORT || 8080;

app.use((req, res, next) => {
	res.locals.APP_NAME = process.env.APP_NAME || 'Название приложения';
	next();
});

app.use(cors());

app.use(express.static(join(process.cwd(), '/public')));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', join(process.cwd(), '/views'));
app.set('view engine', 'ejs');

app.use(session);

app.use(routes);

if (process.env.NODE_ENV !== 'development') {
	app.set('trust proxy', 1);
	app.use((req, res, next) => res.status(404).send('custom 404 error'));
}

export default async () => {
	app.listen(port, () => {
		logger.info(`Сервер запущен на порту: ${port}`);
		Promise.resolve();
	});
};
