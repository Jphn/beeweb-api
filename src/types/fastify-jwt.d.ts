import '@fastify/jwt';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: {
			id: string;
			isAdmin: boolean;
		}; // payload type is used for signing and verifying
		user: {
			id: string;
			isAdmin: boolean;
		}; // user type is return type of `request.user` object
	}
}
