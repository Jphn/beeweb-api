import { CustomError } from "../errors/custom-error";
import { Either, right } from "../errors/either";
import { Entity } from "./entity";

export interface ApiaryDataProps {
	readonly uniqueKey: string;
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

	static create(
		{
			uniqueKey,
			temp,
			humidity,
			lux,
			atmosPressure,
			lat,
			lon,
		}: ApiaryDataProps,
		_id?: string
	): Either<CustomError, ApiaryData> {
		return right(
			new ApiaryData(
				{ uniqueKey, temp, humidity, lux, atmosPressure, lat, lon },
				_id
			)
		);
	}
}
