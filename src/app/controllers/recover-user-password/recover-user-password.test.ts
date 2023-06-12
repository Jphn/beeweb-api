import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { InMemoryMailService } from '../../../tests/services/in-memory-mail-service';
import { User } from '../../entities/user';
import { RecoverUserPasswordUseCase } from '../../use-cases/recover-user-password/recover-user-password';
import { RecoverUserPasswordController } from './recover-user-password';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const mailService = new InMemoryMailService();

	const useCase = new RecoverUserPasswordUseCase(
		usersRepository,
		mailService
	);
	const controller = new RecoverUserPasswordController(useCase);

	const payload = {
		validEmail: 'user@email.com',
		invalidEmail: 'invalid@email.com',
		handle: {
			from: 'beeweb@tech.com',
			subject: 'Recovery email requested!',
			body: 'Sample body.',
		},
	};

	const userOrError = await User.create({
		firstName: 'User',
		lastName: 'Name',
		email: payload.validEmail,
		password: 'sTr0ng^pa55worD',
		isAdmin: false,
	});

	if (userOrError.isLeft())
		throw new Error('Error creating user inside makeSut.');

	await usersRepository.create(userOrError.value);

	return { usersRepository, mailService, controller, payload };
}

describe('[Controller] Recover user password', async function () {
	const sut = await makeSut();

	it('should return 200 when everything is right', async function () {
		const { controller, payload } = sut;

		const response = await controller.handle({
			...payload.handle,
			to: payload.validEmail,
		});

		expect(response.statusCode).equals(200);
	});

	it('should return 404 when user email is not registered', async function () {
		const { controller, payload } = sut;

		const response = await controller.handle({
			...payload.handle,
			to: payload.invalidEmail,
		});

		expect(response.statusCode).equals(404);
	});
});
