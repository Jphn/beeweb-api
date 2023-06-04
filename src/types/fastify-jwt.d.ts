import '@fastify/jwt';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: {
			id: string;
			email: string;
		}; // payload type is used for signing and verifying
		user: {
			id: string;
			email: string;
		}; // user type is return type of `request.user` object
	}
}
