declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: 'development' | 'production';
			PORT: number;

			JWT_SECRET: string;

			MAIL_HOST: string;
			MAIL_PORT: number;
			MAIL_USER: string;
			MAIL_PASSWORD: string;

			TYPEORM_HOST: string;
			TYPEORM_USERNAME: string;
			TYPEORM_PASSWORD: string;
			TYPEORM_DATABASE: string;
			TYPEORM_PORT: number;
		}
	}
}

export {};
