import { DataSource } from 'typeorm';
import environment from '../../environment';

const {
	TYPEORM_HOST,
	TYPEORM_PORT,
	TYPEORM_USERNAME,
	TYPEORM_PASSWORD,
	TYPEORM_DATABASE,
} = environment;

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: TYPEORM_HOST,
	port: TYPEORM_PORT,
	username: TYPEORM_USERNAME,
	password: TYPEORM_PASSWORD,
	database: TYPEORM_DATABASE,
	migrations: ['src/infra/database/migrations/*.ts'],
	entities: ['src/infra/database/schemas/*.ts'],
	migrationsRun: true,
});
