import { User } from '../../app/entities/user';

export interface UsersRepository {
	create(user: User): Promise<void>;
	findUserByEmail(email: string): Promise<User | null>;
	findUserById(id: string): Promise<User | null>;
}
