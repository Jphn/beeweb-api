import { User, UserCreateProps } from '../../entities/user';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';

type UserSignUpRequest = {
	adminId: string;
	userProps: UserCreateProps;
};

type UserSignUpResponse = Either<Error, User>;

export class UserSignUp {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		adminId,
		userProps,
	}: UserSignUpRequest): Promise<UserSignUpResponse> {
		const adminOrError = await this.usersRepository.findUserById(adminId);

		const { firstName, lastName, email, password, isAdmin } = userProps;

		if (
			adminOrError.isLeft() ||
			(adminOrError.isRight() && !adminOrError.value.isAdmin)
		)
			return left(new Error('Operation not authorized!'));

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
