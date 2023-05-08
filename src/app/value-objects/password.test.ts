import { describe, expect, it } from 'vitest';
import { Password } from './password';

describe('Password value object', function () {
	it('should be able to create a new password', async function () {
		const stringPassword = 'eXamPlePassWorDD';
		const password = await Password.create(stringPassword);

		if (password.isLeft()) return;

		expect(password.value).toBeInstanceOf(Password);
		expect(password.value.compare(stringPassword)).resolves.toBeTruthy();
	});

	it('should be able to compare passwords', async function () {
		const rightPass = 'eXamPlePassWorDD';
		const wrongPass = 'eXamPleWrONgPassWorDD';
		const password = await Password.create(rightPass);

		if (password.isLeft()) return;

		expect(password.value).toBeInstanceOf(Password);
		expect(password.value.compare(rightPass)).resolves.toBeTruthy();
		expect(password.value.compare(wrongPass)).resolves.toBeFalsy();
	});
});
