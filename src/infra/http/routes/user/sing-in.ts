import { UserSignIn } from '../../../../app/use-cases/user-sign-in/user-sign-in';
import { FastifyJsonSchemaToTsInstance } from '../../../app';
import { postgresUsersRepository } from '../../../database/repositories';
import userJsonSchema from './schemas/userJsonSchema';

const path = '/auth';

const body = {
	type: 'object',

	required: ['email', 'password'],

	additionalProperties: false,

	properties: {
		email: userJsonSchema.properties.email,

		password: userJsonSchema.properties.password,
	},
} as const;

export default async function (app: FastifyJsonSchemaToTsInstance) {
	const usersRepository = postgresUsersRepository;
	const userSignIn = new UserSignIn(usersRepository);

	app.post(
		path,
		{
			schema: {
				body,
			},
		},
		async function (request, reply) {
			const response = await userSignIn.execute({
				email: request.body.email,
				password: request.body.password,
			});

			if (response.isLeft()) {
				reply.code(response.value.statusCode);

				return response.value;
			}

			reply.code(202);

			return response.value;
		}
	);
}
