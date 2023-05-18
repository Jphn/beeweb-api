import { AppDataSource } from '../app-data-source';
import { PostgresUsersRepository } from './postgres-users-repository';

export const postgresUsersRepository = new PostgresUsersRepository(
	AppDataSource
);
