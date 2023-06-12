import { compare, hash } from 'bcrypt';
import { randomInt } from 'crypto';
import { CustomError } from '../errors/custom-error';
import { Either, left, right } from '../errors/either';
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

	static validate(password: string): boolean {
		const expression =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,15}$/;

		const isValid = !!password.match(expression);

		return isValid;
	}

	static async create(
		password: string,
		isHash?: boolean
	): Promise<Either<CustomError, Password>> {
		if (!isHash) {
			if (!Password.validate(password))
				return left(new CustomError('Invalid password format!', 406));

			password = await Password.crypto(password);
		}

		return right(new Password({ value: password }));
	}

	async compare(compareTo: string) {
		return await compare(compareTo, this.props.value);
	}

	get value() {
		return this.props.value;
	}
}
