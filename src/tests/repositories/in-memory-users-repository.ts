import { User } from '../../app/entities/user';
import { UsersRepository } from '../../app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	private items: User[] = [];

	async create(user: User): Promise<void> {
		const conflictingUser = await this.findUserByEmail(user.email);

		if (conflictingUser) throw new Error('Email is already been used.');

		this.items.push(user);
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return (
			this.items.find((user) => {
				return user.email == email;
			}) || null
		);
	}

	async findUserById(id: string): Promise<User | null> {
		return (
			this.items.find((user) => {
				return user.id == id;
			}) || null
		);
	}
}
