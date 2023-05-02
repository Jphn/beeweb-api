import { expect, test } from 'vitest';
import { User } from './user';

test('create an user', function () {
	const user = new User({
		firstName: 'John',
		lastName: 'Doe',
		isAdmin: true,
		email: 'johndoe@email.com',
		password: 'hash',
	});

	expect(user).toBeInstanceOf(User);
});
