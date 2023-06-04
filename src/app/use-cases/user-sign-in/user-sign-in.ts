import { User } from '../../entities/user';
import { CustomError } from '../../errors/custom-error';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';

interface UserSignInRequest {
	email: string;
	password: string;
}

type UserSignInResponse = Either<CustomError, User>;

export class UserSignIn {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: UserSignInRequest): Promise<UserSignInResponse> {
		const userOrError = await this.usersRepository.findUserByEmail(email);

		if (
			userOrError.isLeft() ||
			(userOrError.isRight() &&
				!(await userOrError.value.password.compare(password)))
		)
			return left(new CustomError('Invalid email or password!', 406));

		return right(userOrError.value);
	}
}
