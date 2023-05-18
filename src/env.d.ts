declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: 'development' | 'production';
			PORT: number;
			TYPEORM_HOST: string;
			TYPEORM_USERNAME: string;
			TYPEORM_PASSWORD: string;
			TYPEORM_DATABASE: string;
			TYPEORM_PORT: number;
		}
	}
}

export {};
