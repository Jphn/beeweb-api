import { Entity } from './entity';

export interface HiveDataProps {
	temp: number;
	humidity: number;
	weight: number;
	lux: number;
	noise: number;
}

export class HiveData extends Entity<HiveDataProps> {
	private constructor(props: HiveDataProps, _id?: string) {
		super(props, _id);
	}

	static create({ temp, humidity, weight, lux, noise }: HiveDataProps, _id?: string) {
		return new HiveData({ temp, humidity, weight, lux, noise }, _id);
	}
}
