import { User } from '../../app/entities/user';
import { CustomError } from '../errors/custom-error';
import { Either } from '../errors/either';

export interface UsersRepository {
	create(user: User): Promise<Either<CustomError, null>>;
	findUserByEmail(email: string): Promise<Either<CustomError, User>>;
	findUserById(id: string): Promise<Either<CustomError, User>>;
}
