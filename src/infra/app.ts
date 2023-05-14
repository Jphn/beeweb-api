import autoload from '@fastify/autoload';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import fastify from 'fastify';
import path from 'path';

const app = fastify({
	logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

export type FastifyJsonSchemaToTsInstance = typeof app;

app.register(autoload, {
	dir: path.join(__dirname, 'http/routes'),
	forceESM: true,
});

export default app;
