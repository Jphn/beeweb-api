import { EntitySchema } from 'typeorm';
import { HiveEntityProps } from './hive';

export interface HiveDataEntityProps {
	id: string;
	hive: HiveEntityProps;
	temp: number;
	humidity: number;
	weight: number;
	lux: number;
	noise: number;
}

export const HiveDataEntity = new EntitySchema<HiveDataEntityProps>({
	name: 'hiveData',
	tableName: 'hive_data',
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
		weight: {
			type: 'decimal',
			nullable: false,
		},
		lux: {
			type: 'decimal',
			nullable: false,
		},
		noise: {
			type: 'decimal',
			nullable: false,
		},
	},
	relations: {
		hive: {
			type: 'many-to-one',
			target: 'hive',
			joinColumn: {
				name: 'hive_id',
			},
			inverseSide: 'data',
		},
	},
});
