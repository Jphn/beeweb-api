import { UserCreateProps } from '../../entities/user';
import { CustomError } from '../../errors/custom-error';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';

interface GetUserInfoRequest {
	id: string;
}

type GetUserInfoResponse = Either<
	CustomError,
	Omit<UserCreateProps, 'password'>
>;

export class GetUserInfoUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ id }: GetUserInfoRequest): Promise<GetUserInfoResponse> {
		const userOrError = await this.usersRepository.findUserById(id);

		if (userOrError.isLeft()) return left(userOrError.value);

		const { firstName, email, isAdmin, lastName } = userOrError.value;

		return right({
			firstName,
			email: email.value,
			isAdmin,
			lastName,
		});
	}
}
