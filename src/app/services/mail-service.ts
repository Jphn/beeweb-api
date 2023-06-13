import { CustomError } from '../errors/custom-error';
import { Either } from '../errors/either';

export interface MailService {
	send(
		from: string,
		to: string,
		subject: string,
		body: string
	): Promise<Either<CustomError, null>>;
}
