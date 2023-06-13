import { describe, expect, it } from 'vitest';
import { CustomError } from '../errors/custom-error';
import { User } from './user';

describe('[Entity] User', function () {
	it('should be able to create an user', async function () {
		const userOrError = await User.create({
			firstName: 'John',
			lastName: 'Doe',
			isAdmin: true,
			email: 'johndoe@email.com',
			password: 'sTr0ng^pa55worD',
		});

		expect(userOrError.value).toBeInstanceOf(User);
		expect(userOrError.isLeft()).toBeFalsy();
		expect(userOrError.isRight()).toBeTruthy();
	});

	it('should not be able to create when using invalid email format', async function () {
		const userOrError = await User.create({
			firstName: 'John',
			lastName: 'Doe',
			isAdmin: true,
			email: 'johndoe email com',
			password: 'sTr0ng^pa55worD',
		});

		expect(userOrError.isLeft()).toBeTruthy();
		expect(userOrError.isRight()).toBeFalsy();
		expect(userOrError.value).toBeInstanceOf(CustomError);
	});
});
