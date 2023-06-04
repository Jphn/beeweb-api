import { CustomError } from '../errors/custom-error';
import { Either, left, right } from '../errors/either';
import { ValueObject } from './value-object';

export interface EmailProps {
	value: string;
}

export class Email extends ValueObject<EmailProps> {
	private constructor(props: EmailProps) {
		super(props);
	}

	private static isEmailValid(email: string) {
		const validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		return !!email.match(validRegex);
	}

	static create(email: string): Either<CustomError, Email> {
		if (!Email.isEmailValid(email))
			return left(new CustomError('Invalid email format!', 400));

		return right(new Email({ value: email }));
	}

	get value() {
		return this.props.value;
	}
}
