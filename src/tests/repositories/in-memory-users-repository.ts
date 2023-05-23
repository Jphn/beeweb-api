import { User } from '../../app/entities/user';
import { CustomError } from '../../app/errors/custom-error';
import { Either, left, right } from '../../app/errors/either';
import { UsersRepository } from '../../app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = [];

	async create(user: User): Promise<Either<CustomError, null>> {
		const conflictingUser = await this.findUserByEmail(user.email.value);

		if (conflictingUser.isRight())
			return left(new CustomError('Email is already been used.', 400));

		this.items.push(user);

		return right(null);
	}

	async findUserByEmail(email: string): Promise<Either<CustomError, User>> {
		const user =
			this.items.find((user) => {
				return user.email.value == email;
			}) || null;

		if (user === null)
			return left(new CustomError('User email not found!', 404));

		return right(user);
	}

	async findUserById(id: string): Promise<Either<CustomError, User>> {
		const user =
			this.items.find((user) => {
				return user.id == id;
			}) || null;

		if (user === null)
			return left(new CustomError('User id not found!', 404));

		return right(user);
	}
}
