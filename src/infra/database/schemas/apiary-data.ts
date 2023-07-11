import { EntitySchema } from 'typeorm';
import { ApiaryDataProps } from '../../../app/entities/apiary-data';
import { ApiaryEntityProps } from './apiary';

export type ApiaryDataEntityProps = {
	id: string;
	apiary: ApiaryEntityProps;
} & ApiaryDataProps;

export const ApiaryDataEntity = new EntitySchema<ApiaryDataEntityProps>({
	name: 'apiaryData',
	tableName: 'apiary_data',
	columns: {
		id: {
			type: 'uuid',
			primary: true,
		},
		temp: {
			type: 'decimal',
			nullable: false,
		},
		humidity: {
			type: 'decimal',
			nullable: false,
		},
		lux: {
			type: 'decimal',
			nullable: false,
		},
		atmosPressure: {
			type: 'decimal',
			nullable: false,
		},
		lat: {
			type: 'decimal',
			nullable: false,
		},
		lon: {
			type: 'decimal',
			nullable: false,
		},
	},
	relations: {
		apiary: {
			type: 'many-to-one',
			target: 'apiary',
			joinColumn: {
				name: 'apiary_id',
			},
			inverseSide: 'data',
		},
	},
});
