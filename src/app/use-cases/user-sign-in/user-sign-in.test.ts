import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { UserSignIn } from './user-sign-in';

function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const userSignIn = new UserSignIn(usersRepository);

	const userOrError = User.create({
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@email.com',
		isAdmin: false,
		password: 'hash',
	});

	return { usersRepository, userSignIn, userOrError };
}

describe('User sign in', function () {
	it('should be able to sign in', async function () {
		const { usersRepository, userSignIn, userOrError } = makeSut();

		if (userOrError.isLeft()) return;

		await usersRepository.create(userOrError.value);

		const response = await userSignIn.execute({
			email: userOrError.value.email.value,
			password: userOrError.value.password,
		});

		expect(response.isRight()).toBeTruthy();
		expect(response.value).toBeInstanceOf(User);
	});

	it('should not be able to sign in when user is not registered', async function () {
		const { usersRepository, userSignIn, userOrError } = makeSut();

		if (userOrError.isRight()) {
			await usersRepository.create(userOrError.value);

			const response = await userSignIn.execute({
				email: 'doejohn@email.com',
				password: 'password',
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		}
	});

	it('should not be able to sign in when user password is wrong', async function () {
		const { usersRepository, userSignIn, userOrError } = makeSut();

		if (userOrError.isRight()) {
			await usersRepository.create(userOrError.value);

			const response = await userSignIn.execute({
				email: userOrError.value.email.value,
				password: 'wrongPassword',
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		}
	});
});
