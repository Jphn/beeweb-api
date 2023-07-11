import { Entity } from './entity';

export interface ApiaryDataProps {
	temp: number;
	humidity: number;
	lux: number;
	atmosPressure: number;
	lat: number;
	lon: number;
}

export class ApiaryData extends Entity<ApiaryDataProps> {
	private constructor(props: ApiaryDataProps, _id?: string) {
		super(props, _id);
	}

	static create({ temp, humidity, lux, atmosPressure, lat, lon }: ApiaryDataProps, _id?: string) {
		return new ApiaryData({ temp, humidity, lux, atmosPressure, lat, lon }, _id);
	}
}
