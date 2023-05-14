import app from './infra/app';

(async () => {
	app.listen({ port: 3000 }, function (err, address) {
		if (err) {
			console.log(err);
			process.exit(1);
		}

		console.log(`listening at ${address}`);
	});
})();
