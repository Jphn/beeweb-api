import { describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { CustomError } from '../../errors/custom-error';
import { UserSignUp } from './user-sign-up';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const userSignUp = new UserSignUp(usersRepository);

	const validPassword = 'password';

	const adminOrError = await User.create({
		firstName: 'Admin',
		lastName: '',
		email: 'admin@email.com',
		password: validPassword,
		isAdmin: true,
	});

	return { usersRepository, userSignUp, validPassword, adminOrError };
}

describe('[Use Case] User sign up', async function () {
	const sut = await makeSut();

	it('should be able to sign up', async function () {
		const { userSignUp, usersRepository, validPassword, adminOrError } =
			sut;

		if (adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);

		const { email } = adminOrError.value;

		const response = await userSignUp.execute({
			adminEmail: email.value,
			adminPassword: validPassword,
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
		const { userSignUp, usersRepository, validPassword, adminOrError } =
			sut;

		const invalidPassword = 'rootPassword';

		const rootOrError = await User.create({
			firstName: 'Not Admin',
			lastName: '',
			email: 'notadmin@email.com',
			password: invalidPassword,
			isAdmin: false,
		});

		if (rootOrError.isLeft() || adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);
		await usersRepository.create(rootOrError.value);

		const { email: validEmail } = adminOrError.value;
		const { email: invalidEmail } = rootOrError.value;

		test('non registered email as admin email', async function () {
			const response = await userSignUp.execute({
				adminEmail: 'nonregistered@email.com',
				adminPassword: validPassword,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});

		test('root user email as admin email', async function () {
			const response = await userSignUp.execute({
				adminEmail: invalidEmail.value,
				adminPassword: validPassword,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});

		test('invalid password as admin pass', async function () {
			const response = await userSignUp.execute({
				adminEmail: validEmail.value,
				adminPassword: invalidPassword,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});
	});

	it('should not be able to sign up when using an email already registered', async function () {
		const { userSignUp, usersRepository, validPassword, adminOrError } =
			sut;

		if (adminOrError.isLeft()) return;

		await usersRepository.create(adminOrError.value);

		const { email: validEmail } = adminOrError.value;

		const response = await userSignUp.execute({
			adminEmail: validEmail.value,
			adminPassword: validPassword,
			userProps: {
				email: adminOrError.value.email.value,
				password: 'password',
				firstName: 'John',
				lastName: 'Doe',
				isAdmin: false,
			},
		});

		expect(response.isLeft()).toBeTruthy();
		expect(response.value).toBeInstanceOf(CustomError);
	});
});
