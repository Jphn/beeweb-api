import { CustomError } from '../../errors/custom-error';
import { Either, left, right } from '../../errors/either';
import { UsersRepository } from '../../repositories/users-repository';
import { MailService } from '../../services/mail-service';

export interface RecoverUserPasswordUseCaseRequest {
	from: string;
	to: string;
	subject: string;
	body: string;
}

type RecoverUserPasswordUseCaseResponse = Either<CustomError, null>;

export class RecoverUserPasswordUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private mailService: MailService
	) {}

	async execute({
		from,
		to,
		subject,
		body,
	}: RecoverUserPasswordUseCaseRequest): Promise<RecoverUserPasswordUseCaseResponse> {
		const userOrError = await this.usersRepository.findUserByEmail(to);

		if (userOrError.isLeft()) return left(userOrError.value);

		const mailResponse = await this.mailService.send(
			from,
			to,
			subject,
			body
		);

		if (mailResponse.isLeft()) return left(mailResponse.value);

		return right(null);
	}
}
