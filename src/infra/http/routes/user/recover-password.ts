import { RecoverUserPasswordController } from '../../../../app/controllers/recover-user-password/recover-user-password';
import { RecoverUserPasswordUseCase } from '../../../../app/use-cases/recover-user-password/recover-user-password';
import { FastifyJsonSchemaToTsInstance } from '../../../app';
import { postgresUsersRepository } from '../../../database/repositories';
import { nodemailerMailService } from '../../../services';
import userJsonSchema from './schemas/userJsonSchema';

const path = '/recover';

const body = {
	type: 'object',

	required: ['email'],

	additionalProperties: false,

	properties: {
		email: userJsonSchema.properties.email,
	},
} as const;

export default async function (app: FastifyJsonSchemaToTsInstance) {
	const usersRepository = postgresUsersRepository;
	const mailService = nodemailerMailService;
	const recoverUserPasswordUseCase = new RecoverUserPasswordUseCase(
		usersRepository,
		mailService
	);
	const recoverUserPasswordController = new RecoverUserPasswordController(
		recoverUserPasswordUseCase
	);

	app.post(
		path,
		{
			schema: {
				body,
			},
		},
		async function (req, rep) {
			const { email } = req.body;

			const response = await recoverUserPasswordController.handle({
				from: 'beeweb@tech.com',
				to: email,
				subject: 'Password recovery requested!',
				body: 'Here goes the body, this is just a test.',
			});

			rep.code(response.statusCode);

			return { msg: response.message };
		}
	);
}
