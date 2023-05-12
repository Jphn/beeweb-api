import { describe, expect, it } from 'vitest';
import { Password } from './password';

describe('[Value Object] Password', function () {
	it('should be able to create a new password', async function () {
		const stringPassword = 'eXamPlePassWorDD';
		const password = await Password.create(stringPassword);

		if (password.isLeft()) return;

		expect(password.value).toBeInstanceOf(Password);
		expect(await password.value.compare(stringPassword)).toBeTruthy();
	});

	it('should be able to compare passwords', async function () {
		const rightPass = 'eXamPlePassWorDD';
		const wrongPass = 'eXamPleWrONgPassWorDD';
		const passwordOrError = await Password.create(rightPass);

		if (passwordOrError.isLeft()) return;

		expect(passwordOrError.value).toBeInstanceOf(Password);
		expect(await passwordOrError.value.compare(rightPass)).toBeTruthy();
		expect(await passwordOrError.value.compare(wrongPass)).toBeFalsy();
	});
});
