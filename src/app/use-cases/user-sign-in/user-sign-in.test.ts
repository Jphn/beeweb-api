import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { UserSignIn } from './user-sign-in';

describe('User sign in', function () {
	it('should be able to sign in', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignIn = new UserSignIn(usersRepository);

		const user = new User({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@email.com',
			isAdmin: false,
			password: 'hash',
		});

		await usersRepository.create(user);

		expect(
			userSignIn.execute({
				email: user.email,
				password: user.password,
			})
		).resolves.toBeInstanceOf(User);
	});

	it('should not be able to sign in when user is not registered', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignIn = new UserSignIn(usersRepository);

		const user = new User({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@email.com',
			isAdmin: false,
			password: 'hash',
		});

		await usersRepository.create(user);

		expect(
			userSignIn.execute({
				email: 'doejohn@email.com',
				password: 'password',
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to sign in when user password is wrong', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignIn = new UserSignIn(usersRepository);

		const user = new User({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@email.com',
			isAdmin: false,
			password: 'hash',
		});

		await usersRepository.create(user);

		expect(
			userSignIn.execute({
				email: user.email,
				password: 'wrongPassword',
			})
		).rejects.toBeInstanceOf(Error);
	});
});
