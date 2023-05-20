import { User, UserCreateProps } from '../../entities/user';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';

type UserSignUpRequest = {
	adminEmail: string;
	adminPassword: string;
	userProps: UserCreateProps;
};

type UserSignUpResponse = Either<Error, User>;

export class UserSignUp {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		adminEmail,
		adminPassword,
		userProps,
	}: UserSignUpRequest): Promise<UserSignUpResponse> {
		const adminOrError = await this.usersRepository.findUserByEmail(
			adminEmail
		);

		if (
			adminOrError.isLeft() ||
			(adminOrError.isRight() &&
				(!adminOrError.value.isAdmin ||
					!(await adminOrError.value.password.compare(
						adminPassword
					))))
		)
			return left(new Error('Operation not authorized!'));

		const { firstName, lastName, email, password, isAdmin } = userProps;

		const userOrError = await User.create({
			firstName,
			lastName,
			email,
			password,
			isAdmin,
		});

		if (userOrError.isLeft()) return left(userOrError.value);

		const newUserOrError = await this.usersRepository.create(
			userOrError.value
		);

		if (newUserOrError.isLeft()) return left(newUserOrError.value);

		return right(userOrError.value);
	}
}
