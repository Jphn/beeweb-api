import { randomUUID } from 'crypto';

export interface UserProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export class User {
	private _id: string;
	private props: UserProps;

	constructor(props: UserProps, _id?: string) {
		this._id = _id ?? randomUUID();

		this.props = props;
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
