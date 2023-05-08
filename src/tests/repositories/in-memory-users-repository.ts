import { User } from '../../app/entities/user';
import { Either, left, right } from '../../app/errors/either';
import { UsersRepository } from '../../app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = [];

	async create(user: User): Promise<Either<Error, null>> {
		const conflictingUser = await this.findUserByEmail(user.email.value);

		if (conflictingUser.isRight())
			return left(new Error('Email is already been used.'));

		this.items.push(user);

		return right(null);
	}

	async findUserByEmail(email: string): Promise<Either<Error, User>> {
		const user =
			this.items.find((user) => {
				return user.email.value == email;
			}) || null;

		if (user === null) return left(new Error('User email not found!'));

		return right(user);
	}

	async findUserById(id: string): Promise<Either<Error, User>> {
		const user =
			this.items.find((user) => {
				return user.id == id;
			}) || null;

		if (user === null) return left(new Error('User id not found!'));

		return right(user);
	}
}
