import 'reflect-metadata';
import environment from './environment';
import app from './infra/app';
import { AppDataSource } from './infra/database/app-data-source';

(async () => {
	try {
		const { PORT } = environment;

		await AppDataSource.initialize();

		console.log('[main.ts] Successfully connected to data source!');

		app.listen({ port: PORT || 3000 }, function (err, address) {
			if (err) {
				console.log(err);
				process.exit(1);
			}

			console.log(`[main.ts] Listening at ${address}`);
		});
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
})();
