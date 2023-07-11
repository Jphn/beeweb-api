import { CustomError } from '../errors/custom-error';
import { Either, right } from '../errors/either';
import { Entity } from './entity';

export interface ApiaryProps {
	name: string;
}

export class Apiary extends Entity<ApiaryProps> {
	private constructor(props: ApiaryProps, _id?: string) {
		super(props, _id);
	}

	static create({ name }: ApiaryProps, _id?: string): Either<CustomError, Apiary> {
		return right(new Apiary({ name }, _id));
	}
}
