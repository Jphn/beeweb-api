import { UserSignUp } from '../../../../app/use-cases/user-sign-up/user-sign-up';
import { FastifyJsonSchemaToTsInstance } from '../../../app';
import { postgresUsersRepository } from '../../../database/repositories';
import userJsonSchema from './schemas/userJsonSchema';

const path = '';

const body = {
	type: 'object',

	required: ['adminEmail', 'adminPassword', 'payload'],

	additionalProperties: false,

	properties: {
		adminEmail: userJsonSchema.properties.email,

		adminPassword: userJsonSchema.properties.password,

		payload: userJsonSchema,
	},
} as const;

export default async function (app: FastifyJsonSchemaToTsInstance) {
	const usersRepository = postgresUsersRepository;
	const userSignUp = new UserSignUp(usersRepository);

	app.post(
		path,
		{
			schema: {
				body,
			},
		},
		async function (request, reply) {
			const response = await userSignUp.execute({
				adminEmail: request.body.adminEmail,
				adminPassword: request.body.adminPassword,
				userProps: request.body.payload,
			});

			if (response.isLeft()) return { msg: response.value.message };

			return request.body;
		}
	);
}
