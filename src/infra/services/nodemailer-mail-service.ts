import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { CustomError } from '../../app/errors/custom-error';
import { Either, right } from '../../app/errors/either';
import { MailService } from '../../app/services/mail-service';
import environment from '../../environment';

const { MAIL_PASSWORD, MAIL_USER, MAIL_HOST, MAIL_PORT } = environment;

export class NodemailerMailService implements MailService {
	private readonly transporter: Mail;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: MAIL_HOST,
			port: MAIL_PORT,
			auth: {
				user: MAIL_USER,
				pass: MAIL_PASSWORD,
			},
		});
	}

	async send(
		from: string,
		to: string,
		subject: string,
		body: string
	): Promise<Either<CustomError, null>> {
		await this.transporter.sendMail({
			from,
			to,
			subject,
			html: body,
		});

		return right(null);
	}
}
