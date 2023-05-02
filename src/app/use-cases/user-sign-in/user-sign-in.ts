import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';

interface UserSignInRequest {
	email: string;
	password: string;
}

type UserSignInResponse = User;

export class UserSignIn {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: UserSignInRequest): Promise<UserSignInResponse> {
		const user = await this.usersRepository.findUserByEmail(email);

		if (!user || user.password != password)
			throw new Error('Wrong email or password!');

		return user;
	}
}
