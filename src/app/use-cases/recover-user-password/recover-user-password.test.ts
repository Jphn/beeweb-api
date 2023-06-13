import { afterEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { InMemoryMailService } from '../../../tests/services/in-memory-mail-service';
import { User } from '../../entities/user';
import { RecoverUserPasswordUseCase } from './recover-user-password';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const mailService = new InMemoryMailService();

	const useCase = new RecoverUserPasswordUseCase(
		usersRepository,
		mailService
	);

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

	return { usersRepository, mailService, useCase, payload };
}

describe('[Use Case] Recover user password', async function () {
	const sut = await makeSut();

	afterEach(function () {
		const { mailService } = sut;
		mailService.clear();
	});

	it('should be able to send when passing registered email', async function () {
		const { payload, useCase, mailService } = sut;

		const message = {
			...payload.handle,
			to: payload.validEmail,
		};

		const response = await useCase.execute(message);

		expect(response.isRight()).toBeTruthy();
		expect(mailService.items).toContainEqual(message);
	});

	it('should not be able to send when passing unregistered email', async function () {
		const { payload, useCase, mailService } = sut;

		const message = {
			...payload.handle,
			to: payload.invalidEmail,
		};

		const response = await useCase.execute(message);

		expect(response.isLeft()).toBeTruthy();
		expect(mailService.items).not.toContainEqual(message);
	});
});
