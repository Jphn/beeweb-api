import { Either, left, right } from '../errors/either';
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';
import { Entity } from './entity';

export interface UserProps {
	firstName: string;
	lastName: string;
	email: Email;
	password: Password;
	isAdmin: boolean;
}
export type UserCreateProps = Omit<UserProps, 'email' | 'password'> & {
	email: string;
	password: string;
};
export class User extends Entity<UserProps> {
	private constructor(props: UserProps, _id?: string) {
		super(props, _id);
	}

	static async create(
		props: UserCreateProps,
		_id?: string
	): Promise<Either<Error, User>> {
		const { firstName, lastName, email, password, isAdmin } = props;

		const emailOrError = Email.create(email);

		if (emailOrError.isLeft()) return left(emailOrError.value);

		const passwordOrError = await Password.create(password);

		if (passwordOrError.isLeft()) return left(passwordOrError.value);

		return right(
			new User(
				{
					firstName,
					lastName,
					email: emailOrError.value,
					password: passwordOrError.value,
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
