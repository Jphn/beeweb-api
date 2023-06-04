import { DataSource, Repository } from 'typeorm';
import { User } from '../../../app/entities/user';
import { CustomError } from '../../../app/errors/custom-error';
import { Either, left, right } from '../../../app/errors/either';
import { UsersRepository } from '../../../app/repositories/users-repository';
import { UserEntity, UserSchema } from '../schemas/user';

export class PostgresUsersRepository implements UsersRepository {
	private items: User[] = [];

	private repository: Repository<UserSchema>;

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository<UserSchema>(UserEntity);
	}

	async create(user: User): Promise<Either<CustomError, null>> {
		const { id, firstName, lastName, email, password, isAdmin } = user;

		const conflictingUser = await this.findUserByEmail(user.email.value);

		if (conflictingUser.isRight())
			return left(new CustomError('Email is already been used.', 400));

		await this.repository.save({
			id,
			firstName,
			lastName,
			email: email.value,
			password: password.value,
			isAdmin,
		});

		return right(null);
	}

	async findUserByEmail(email: string): Promise<Either<CustomError, User>> {
		const response = await this.repository.findOneBy({ email: email });

		if (response === null)
			return left(new CustomError('User email not found!', 404));

		const userOrError = await User.create(response, response.id);

		if (userOrError.isLeft()) return left(userOrError.value);

		return right(userOrError.value);
	}

	async findUserById(id: string): Promise<Either<CustomError, User>> {
		const response = await this.repository.findOneBy({ id: id });

		if (response === null)
			return left(new CustomError('User id not found!', 404));

		const userOrError = await User.create(response, response.id);

		if (userOrError.isLeft()) return left(userOrError.value);

		return right(userOrError.value);
	}
}
