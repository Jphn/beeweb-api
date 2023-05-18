import { UserSignUp } from '../../../../app/use-cases/user-sign-up/user-sign-up';
import { FastifyJsonSchemaToTsInstance } from '../../../app';
import { postgresUsersRepository } from '../../../database/repositories';

export default async function (app: FastifyJsonSchemaToTsInstance) {
	const path = '';

	const body = {
		type: 'object',

		required: ['adminEmail', 'adminPassword', 'payload'],

		additionalProperties: false,

		properties: {
			adminEmail: { type: 'string', minLength: 10 },

			adminPassword: {
				type: 'string',
				minLength: 8,
				maxLength: 14,
			},

			payload: {
				type: 'object',

				required: [
					'firstName',
					'lastName',
					'email',
					'password',
					'isAdmin',
				],

				additionalProperties: false,

				properties: {
					firstName: { type: 'string', minLength: 4 },

					lastName: { type: 'string', minLength: 4 },

					email: { type: 'string', minLength: 10 },

					password: {
						type: 'string',
						minLength: 8,
						maxLength: 14,
					},

					isAdmin: {
						type: 'boolean',
					},
				},
			},
		},
	} as const;

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
