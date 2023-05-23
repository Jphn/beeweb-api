import { describe, expect, it } from 'vitest';
import { Password } from './password';

async function makeSut() {
	const rightPass = 'eXamPlePassWorDD';
	const wrongPass = 'eXamPleWrONgPassWorDD';
	const passwordOrError = await Password.create(rightPass);

	return { rightPass, wrongPass, passwordOrError };
}

describe('[Value Object] Password', async function () {
	const sut = await makeSut();

	it('should be able to create a new password', async function () {
		const { rightPass, passwordOrError } = sut;

		if (passwordOrError.isLeft()) return;

		expect(passwordOrError.value).toBeInstanceOf(Password);
		expect(await passwordOrError.value.compare(rightPass)).toBeTruthy();
	});

	it('should be able to compare passwords', async function () {
		const { rightPass, wrongPass, passwordOrError } = sut;

		if (passwordOrError.isLeft()) return;

		expect(passwordOrError.value).toBeInstanceOf(Password);
		expect(await passwordOrError.value.compare(rightPass)).toBeTruthy();
		expect(await passwordOrError.value.compare(wrongPass)).toBeFalsy();
	});

	it.todo('should not be able to create invalid password');
});
