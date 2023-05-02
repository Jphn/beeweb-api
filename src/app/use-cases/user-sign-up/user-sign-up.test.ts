import { randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../tests/repositories/in-memory-users-repository';
import { User } from '../../entities/user';
import { UserSignUp } from './user-sign-up';

describe('User sign up', function () {
	it('should be able to sign up', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignUp = new UserSignUp(usersRepository);

		const admin = new User({
			firstName: 'Admin',
			lastName: '',
			email: 'admin@email.com',
			password: 'password',
			isAdmin: true,
		});

		await usersRepository.create(admin);

		expect(
			userSignUp.execute({
				adminId: admin.id,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			})
		).resolves.toBeInstanceOf(User);
	});

	it('should not be able to sign up when sending invalid admin id', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignUp = new UserSignUp(usersRepository);

		const admin = new User({
			firstName: 'Admin',
			lastName: '',
			email: 'admin@email.com',
			password: 'password',
			isAdmin: true,
		});

		const notAdmin = new User({
			firstName: 'Not Admin',
			lastName: '',
			email: 'notadmin@email.com',
			password: 'password',
			isAdmin: false,
		});

		await usersRepository.create(admin);
		await usersRepository.create(notAdmin);

		expect(
			userSignUp.execute({
				adminId: randomUUID(),
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			})
		).rejects.toBeInstanceOf(Error);

		expect(
			userSignUp.execute({
				adminId: notAdmin.id,
				userProps: {
					email: 'johndoe@email.com',
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			})
		).rejects.toBeInstanceOf(Error);
	});

	it('should be able to sign up when using an existing email', async function () {
		const usersRepository = new InMemoryUsersRepository();
		const userSignUp = new UserSignUp(usersRepository);

		const admin = new User({
			firstName: 'Admin',
			lastName: '',
			email: 'admin@email.com',
			password: 'password',
			isAdmin: true,
		});

		await usersRepository.create(admin);

		expect(
			userSignUp.execute({
				adminId: admin.id,
				userProps: {
					email: admin.email,
					password: 'password',
					firstName: 'John',
					lastName: 'Doe',
					isAdmin: false,
				},
			})
		).rejects.toBeInstanceOf(Error);
	});
});
