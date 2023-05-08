import { User } from '../../entities/user';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';

interface UserSignInRequest {
	email: string;
	password: string;
}

type UserSignInResponse = Either<Error, User>;

export class UserSignIn {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: UserSignInRequest): Promise<UserSignInResponse> {
		const user = await this.usersRepository.findUserByEmail(email);

		if (
			user.isLeft() ||
			(user.isRight() && user.value.password != password)
		)
			return left(new Error('Invalid email or password!'));

		return right(user.value);
	}
}
