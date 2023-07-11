import { Entity } from './entity';

export interface ApiaryProps {
	name: string;
}

export class Apiary extends Entity<ApiaryProps> {
	private constructor(props: ApiaryProps, _id?: string) {
		super(props, _id);
	}

	static create({ name }: ApiaryProps, _id?: string) {
		return new Apiary({ name }, _id);
	}
}
