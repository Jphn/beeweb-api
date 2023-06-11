import { CustomError } from '../../app/errors/custom-error';
import { Either, right } from '../../app/errors/either';
import { MailService } from '../../app/services/mail-service';

interface Mail {
	from: string;
	to: string;
	subject: string;
	body: string;
}

export class InMemoryMailService implements MailService {
	public readonly items: Mail[] = [];

	async send(
		from: string,
		to: string,
		subject: string,
		body: string
	): Promise<Either<CustomError, null>> {
		this.items.push({
			from,
			to,
			subject,
			body,
		});

		return right(null);
	}

	clear() {
		this.items.length = 0;
	}
}
