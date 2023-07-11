import { CustomError } from '../errors/custom-error';
import { Either, right } from '../errors/either';
import { Entity } from './entity';

export interface HiveProps {
	name: string;
}

export class Hive extends Entity<HiveProps> {
	private constructor(props: HiveProps, _id?: string) {
		super(props, _id);
	}

	static create({ name }: HiveProps, _id?: string): Either<CustomError, Hive> {
		return right(new Hive({ name }, _id));
	}
}
