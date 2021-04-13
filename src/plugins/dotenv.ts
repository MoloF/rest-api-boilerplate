import dotenv from 'dotenv';
import { join } from 'path';

if (process.env.NODE_ENV === 'development') {
	dotenv.config();
	console.log('--- СЕРВЕР ЗАПУЩЕН В РЕЖИМЕ РАЗРАБОТКИ ---');
} else {
	dotenv.config({ path: join(process.cwd(), '.env.production') });
}
