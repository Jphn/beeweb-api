import { randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { CustomError } from '../../errors/custom-error';
import { GetUserInfoUseCase } from './get-user-info';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();

	const useCase = new GetUserInfoUseCase(usersRepository);

	const validEmail = 'user@email.com';

	const comparative = {
		firstName: 'User',
		lastName: 'Name',
		email: validEmail,
		isAdmin: false,
	};

	const userOrError = await User.create({
		...comparative,
		password: 'sTr0ng^pa55worD',
	});

	if (userOrError.isLeft())
		throw new Error('Error creating user inside makeSut.');

	await usersRepository.create(userOrError.value);

	const payload = {
		validEmail,
		invalidEmail: 'invalid@email.com',
		id: userOrError.value.id,
		comparative,
	};

	return { usersRepository, useCase, payload };
}

describe('[Use Case] Get user info', async function () {
	const sut = await makeSut();

	it('should be able to get user info', async function () {
		const { useCase, payload } = sut;

		const response = await useCase.execute({ id: payload.id });

		expect(response.isLeft()).toBeFalsy();
		expect(response.value).toEqual(payload.comparative);
	});

	it('should not be able to get nonexistent user info', async function () {
		const { useCase } = sut;

		const response = await useCase.execute({ id: randomUUID() });

		expect(response.isLeft()).toBeTruthy();
		expect(response.value).toBeInstanceOf(CustomError);
	});
});
