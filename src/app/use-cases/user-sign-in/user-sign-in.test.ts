import { describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { UserSignIn } from './user-sign-in';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const userSignIn = new UserSignIn(usersRepository);

	const rightPassword = 'password';
	const wrongPassword = 'wrongPassword';

	const userOrError = await User.create({
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@email.com',
		isAdmin: false,
		password: rightPassword,
	});

	return {
		usersRepository,
		userSignIn,
		rightPassword,
		wrongPassword,
		userOrError,
	};
}

describe('User sign in', function () {
	it('should be able to sign in', async function () {
		const { usersRepository, userSignIn, rightPassword, userOrError } =
			await makeSut();

		if (userOrError.isLeft()) return;

		const { value: user } = userOrError;

		await usersRepository.create(user);

		const response = await userSignIn.execute({
			email: user.email.value,
			password: rightPassword,
		});

		expect(response.isRight()).toBeTruthy();
		expect(response.value).toBeInstanceOf(User);
	});

	it('should not be able to sign in when user is not registered', async function () {
		const { usersRepository, userSignIn, wrongPassword, userOrError } =
			await makeSut();

		if (userOrError.isRight()) {
			await usersRepository.create(userOrError.value);

			const response = await userSignIn.execute({
				email: 'doejohn@email.com',
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		}
	});

	describe('should not be able to sign in when passing...', async function () {
		const {
			usersRepository,
			userSignIn,
			rightPassword,
			wrongPassword,
			userOrError,
		} = await makeSut();

		if (userOrError.isLeft()) return;
		const { value: user } = userOrError;

		await usersRepository.create(user);

		test('wrong password', async function () {
			const response = await userSignIn.execute({
				email: user.email.value,
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		});

		test('wrong email', async function () {
			const response = await userSignIn.execute({
				email: 'wrongemail@email.com',
				password: rightPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		});

		test('both wrong', async function () {
			const response = await userSignIn.execute({
				email: 'wrongemail@email.com',
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(Error);
		});
	});
});
