import { Either, left, right } from '../errors/either';

export interface EmailProps {
	value: string;
}

export class Email {
	private props: EmailProps;

	private constructor(props: EmailProps) {
		this.props = props;
		Object.freeze(this);
	}

	private static isEmailValid(email: string) {
		const validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		return email.match(validRegex);
	}

	static create(email: string): Either<Error, Email> {
		if (!Email.isEmailValid(email))
			return left(new Error('Invalid email!'));

		return right(new Email({ value: email }));
	}

	get value() {
		return this.props.value;
	}
}
