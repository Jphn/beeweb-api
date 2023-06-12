import {
	RecoverUserPasswordUseCase,
	RecoverUserPasswordUseCaseRequest as UseCaseRequest,
} from '../../use-cases/recover-user-password/recover-user-password';

type RecoverUserPasswordControllerRequest = UseCaseRequest;

type RecoverUserPasswordControllerResponse = Promise<{
	statusCode: number;
	message: string;
}>;

export class RecoverUserPasswordController {
	constructor(
		private recoverUserPasswordUseCase: RecoverUserPasswordUseCase
	) {}

	async handle(
		request: RecoverUserPasswordControllerRequest
	): RecoverUserPasswordControllerResponse {
		const response = await this.recoverUserPasswordUseCase.execute(request);

		if (response.isLeft()) {
			const { statusCode, message } = response.value;

			return { statusCode, message };
		}

		return {
			statusCode: 200,
			message: 'Recovery email was sent!',
		};
	}
}
