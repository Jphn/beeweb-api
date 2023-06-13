import { describe, expect, it } from 'vitest';
import { CustomError } from '../errors/custom-error';
import { Password } from './password';

async function makeSut() {
	const rightPass = 'sTr0ng^pa55worD';
	const wrongPass = 'sTr0ng^pa55w0rD';
	const weakPassword = 'weakPass';

	const passwordOrError = await Password.create(rightPass);

	return { rightPass, wrongPass, weakPassword, passwordOrError };
}

describe('[Value Object] Password', async function () {
	const sut = await makeSut();

	it('should be able to create a new password', async function () {
		const { rightPass, passwordOrError } = sut;

		expect(passwordOrError.isRight()).toBeTruthy();
		expect(passwordOrError.value).toBeInstanceOf(Password);

		if (passwordOrError.isLeft()) return;

		expect(await passwordOrError.value.compare(rightPass)).toBeTruthy();
	});

	it('should be able to compare passwords', async function () {
		const { rightPass, wrongPass, passwordOrError } = sut;

		expect(passwordOrError.isLeft()).toBeFalsy();
		expect(passwordOrError.value).toBeInstanceOf(Password);

		if (passwordOrError.isLeft()) return;

		expect(await passwordOrError.value.compare(rightPass)).toBeTruthy();
		expect(await passwordOrError.value.compare(wrongPass)).toBeFalsy();
	});

	it('should not be able to create weak password', async function () {
		const { weakPassword } = sut;

		const passwordOrError = await Password.create(weakPassword);

		expect(passwordOrError.isLeft()).toBeTruthy();
		expect(passwordOrError.value).toBeInstanceOf(CustomError);

		if (passwordOrError.isRight()) return;
	});
});
