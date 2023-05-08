import { randomUUID } from 'crypto';
import { Either, left, right } from '../errors/either';
import { Email } from '../value-objects/email';

export interface UserProps {
	firstName: string;
	lastName: string;
	email: Email;
	password: string;
	isAdmin: boolean;
}
export type UserCreateProps = Omit<UserProps, 'email'> & {
	email: string;
};
export class User {
	private _id: string;
	private props: UserProps;

	private constructor(props: UserProps, _id: string) {
		this._id = _id;

		this.props = props;

		Object.freeze(this);
	}

	static create(props: UserCreateProps, _id?: string): Either<Error, User> {
		const { firstName, lastName, email, password, isAdmin } = props;

		_id = _id ?? randomUUID();

		const emailOrError = Email.create(email);

		if (emailOrError.isLeft()) return left(emailOrError.value);

		return right(
			new User(
				{
					firstName,
					lastName,
					email: emailOrError.value,
					password,
					isAdmin,
				},
				_id
			)
		);
	}

	get id() {
		return this._id;
	}

	get firstName() {
		return this.props.firstName;
	}

	get lastName() {
		return this.props.lastName;
	}

	get email() {
		return this.props.email;
	}

	get isAdmin() {
		return this.props.isAdmin;
	}

	get password() {
		return this.props.password;
	}
}
