import { describe, expect, it } from 'vitest';
import { Apiary } from './apiary';

describe('[Entity] Apiary', function () {
	it('should be able to create an apiary', async function () {
		const hiveOrError = await Apiary.create({
			name: 'Test Apiary',
		});

		expect(hiveOrError.value).toBeInstanceOf(Apiary);
		expect(hiveOrError.isLeft()).toBeFalsy();
		expect(hiveOrError.isRight()).toBeTruthy();
	});
});
