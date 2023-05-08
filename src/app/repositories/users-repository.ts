import { User } from '../../app/entities/user';
import { Either } from '../errors/either';

export interface UsersRepository {
	create(user: User): Promise<Either<Error, null>>;
	findUserByEmail(email: string): Promise<Either<Error, User>>;
	findUserById(id: string): Promise<Either<Error, User>>;
}
