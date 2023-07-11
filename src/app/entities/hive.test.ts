import { describe, expect, it } from 'vitest';
import { Hive } from './hive';

describe('[Entity] Hive', function () {
	it('should be able to create an hive', async function () {
		const hiveOrError = await Hive.create({
			name: 'Test Hive',
		});

		expect(hiveOrError.value).toBeInstanceOf(Hive);
		expect(hiveOrError.isLeft()).toBeFalsy();
		expect(hiveOrError.isRight()).toBeTruthy();
	});
});
