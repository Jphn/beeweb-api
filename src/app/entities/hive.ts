import { Entity } from './entity';

export interface HiveProps {
	name: string;
}

export class Hive extends Entity<HiveProps> {
	private constructor(props: HiveProps, _id?: string) {
		super(props, _id);
	}

	static create({ name }: HiveProps, _id?: string) {
		return new Hive({ name }, _id);
	}
}
