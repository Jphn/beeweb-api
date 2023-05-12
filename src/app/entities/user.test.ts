import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('[Entity] User', function () {
	it('should be able to create an user', async function () {
		const userOrError = await User.create({
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

	it.todo('should not be able to create when using invalid email format');
});
