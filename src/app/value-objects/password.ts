import { compare, hash } from 'bcrypt';
import { randomInt } from 'crypto';
import { Either, right } from '../errors/either';
import { ValueObject } from './value-object';

export interface PasswordProps {
	value: string;
}

export class Password extends ValueObject<PasswordProps> {
	private constructor(props: PasswordProps) {
		super(props);
	}

	private static async crypto(password: string) {
		const randomSalt = randomInt(10, 16);
		const passwordHash = await hash(password, randomSalt);

		return passwordHash;
	}

	static async create(
		password: string,
		isHash?: boolean
	): Promise<Either<Error, Password>> {
		password = isHash ? password : await Password.crypto(password);

		return right(new Password({ value: password }));
	}

	async compare(compareTo: string) {
		return await compare(compareTo, this.props.value);
	}

	get value() {
		return this.props.value;
	}
}
