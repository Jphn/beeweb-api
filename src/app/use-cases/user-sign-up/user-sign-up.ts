import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';

type UserSignUpRequest = {
	adminId: string;
	userProps: Omit<User, 'id'>;
};

type UserSignUpResponse = User;

export class UserSignUp {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		adminId,
		userProps,
	}: UserSignUpRequest): Promise<UserSignUpResponse> {
		const admin = await this.usersRepository.findUserById(adminId);

		if (!admin || !admin.isAdmin) throw new Error('User not authorized!');

		const user = new User(userProps);

		await this.usersRepository.create(user);

		return user;
	}
}
