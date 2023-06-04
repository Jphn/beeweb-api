import autoload from '@fastify/autoload';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import fastify from 'fastify';
import path from 'path';
import environment from '../environment';

const app = fastify({
	logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

app.register(cors, {});

app.register(jwt, {
	secret: environment.JWT_SECRET,
});

app.register(autoload, {
	dir: path.join(__dirname, 'http/routes'),
	forceESM: true,
});

export type FastifyJsonSchemaToTsInstance = typeof app;
export default app;
