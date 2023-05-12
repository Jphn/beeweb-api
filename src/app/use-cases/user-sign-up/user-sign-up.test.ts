import { randomUUID } from 'crypto';
import { describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { UserSignUp } from './user-sign-up';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const userSignUp = new UserSignUp(usersRepository);

	const adminOrError = await User.create({
		firstName: 'Admin',
		lastName: '',
		email: 'admin@email.com',
		password: 'password',
		isAdmin: true,
	});

	return { usersRepository, userSignUp, adminOrError };
}

describe('[Use Case] User sign up', function () {
	it('should be able to sign up', async function () {
		const { userSignUp, usersRepository, adminOrError } = await makeSut();

		if (adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);

		const response = await userSignUp.execute({
			adminId: adminOrError.value.id,
			userProps: {
				email: 'johndoe@email.com',
				password: 'password',
				firstName: 'John',
				lastName: 'Doe',
				isAdmin: false,
			},
		});

		expect(response.isRight()).toBeTruthy();
		expect(response.value).toBeInstanceOf(User);
	});

	describe('should not be able to sign up when sending...', async function () {
		const { userSignUp, usersRepository, adminOrError } = await makeSut();

		const rootOrError = await User.create({
			firstName: 'Not Admin',
			lastName: '',
			email: 'notadmin@email.com',
			password: 'password',
			isAdmin: false,
		});

		if (rootOrError.isLeft() || adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);
		await usersRepository.create(rootOrError.value);

		test('non registered uuid', async function () {
			const response = await userSignUp.execute({
				adminId: randomUUID(),
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		});

		test('root user uuid', async function () {
			const response = await userSignUp.execute({
				adminId: rootOrError.value.id,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		});
	});

	it('should not be able to sign up when using an email already registered', async function () {
		const { userSignUp, usersRepository, adminOrError } = await makeSut();

		if (adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);

		const response = await userSignUp.execute({
			adminId: adminOrError.value.id,
			userProps: {
				email: adminOrError.value.email.value,
				password: 'password',
				firstName: 'John',
				lastName: 'Doe',
				isAdmin: false,
			},
		});

		expect(response.isLeft()).toBeTruthy();
		expect(response.value).toBeInstanceOf(Error);
	});
});
