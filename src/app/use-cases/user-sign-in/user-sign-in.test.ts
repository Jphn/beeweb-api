import { describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { CustomError } from '../../errors/custom-error';
import { UserSignIn } from './user-sign-in';

async function makeSut() {
	const usersRepository = new InMemoryUsersRepository();
	const userSignIn = new UserSignIn(usersRepository);

	const rightPassword = 'sTr0ng^pa55worD';
	const wrongPassword = 'sTr0ng^pa55w0rD';

	const userOrError = await User.create({
		firstName: 'John',
		lastName: 'Doe',
		email: 'johndoe@email.com',
		isAdmin: false,
		password: rightPassword,
	});

	if (userOrError.isLeft())
		throw new Error('Error when creating user inside makeSut!');

	await usersRepository.create(userOrError.value);

	return {
		usersRepository,
		userSignIn,
		rightPassword,
		wrongPassword,
		userOrError,
	};
}

describe('[Use Case] User sign in', async function () {
	const sut = await makeSut();

	it('should be able to sign in', async function () {
		const { usersRepository, userSignIn, rightPassword, userOrError } = sut;

		const { value: user } = userOrError;

		const response = await userSignIn.execute({
			email: user.email.value,
			password: rightPassword,
		});

		expect(response.isRight()).toBeTruthy();
		expect(response.value).toBeInstanceOf(User);
		expect(usersRepository.items).toContainEqual(user);
	});

	it('should not be able to sign in when user is not registered', async function () {
		const { usersRepository, userSignIn, wrongPassword, userOrError } = sut;

		if (userOrError.isRight()) {
			await usersRepository.create(userOrError.value);

			const response = await userSignIn.execute({
				email: 'doejohn@email.com',
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		}
	});

	describe('should not be able to sign in when passing...', async function () {
		const {
			usersRepository,
			userSignIn,
			rightPassword,
			wrongPassword,
			userOrError,
		} = sut;

		const { value: user } = userOrError;

		expect(usersRepository.items).toContainEqual(user);

		test('wrong password', async function () {
			const response = await userSignIn.execute({
				email: user.email.value,
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});

		test('wrong email', async function () {
			const response = await userSignIn.execute({
				email: 'wrongemail@email.com',
				password: rightPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});

		test('both wrong', async function () {
			const response = await userSignIn.execute({
				email: 'wrongemail@email.com',
				password: wrongPassword,
			});

			expect(response.isLeft()).toBeTruthy();
			expect(response.value).toBeInstanceOf(CustomError);
		});
	});
});
