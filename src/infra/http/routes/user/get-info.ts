import { GetUserInfoUseCase } from '../../../../app/use-cases/get-user-info/get-user-info';
import { FastifyJsonSchemaToTsInstance } from '../../../app';
import { postgresUsersRepository } from '../../../database/repositories';

const path = '/:id';

const params = {
	type: 'object',

	required: ['id'],

	additionalProperties: false,

	properties: {
		id: { type: 'string', format: 'uuid' },
	},
} as const;

export default async function (app: FastifyJsonSchemaToTsInstance) {
	const usersRepository = postgresUsersRepository;
	const getUserInfoUseCase = new GetUserInfoUseCase(usersRepository);

	app.get(
		path,
		{
			schema: {
				params,
			},
		},
		async function (req, res) {
			await req.jwtVerify();

			const response = await getUserInfoUseCase.execute({
				id: req.params.id,
			});

			if (response.isLeft()) return response.value;

			return response.value;
		}
	);
}
