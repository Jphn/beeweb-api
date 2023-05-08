import { describe, expect, it } from 'vitest';
import { Email } from './email';

describe('Email value object', function () {
	it('should be able to create an email', function () {
		const email = Email.create('example@email.com');

		expect(email.isRight()).toBeTruthy();
		expect(email.value).toBeInstanceOf(Email);
	});

	it('should not be able to create an email when format is invalid', function () {
		const email = Email.create('invalid email format');

		expect(email.isRight()).toBeFalsy();
		expect(email.value).toBeInstanceOf(Error);
	});
});