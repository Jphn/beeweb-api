import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User entity', function () {
	it('should be able to create an user', function () {
		const userOrError = User.create({
			firstName: 'John',
			lastName: 'Doe',
			isAdmin: true,
			email: 'johndoe@email.com',
			password: 'hash',
		});

		expect(userOrError.value).toBeInstanceOf(User);
		expect(userOrError.isLeft()).toBeFalsy();
		expect(userOrError.isRight()).toBeTruthy();
	});
});
