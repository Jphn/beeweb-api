import { EntitySchema } from 'typeorm';
import { ApiaryEntityProps } from './apiary';
import { HiveDataEntityProps } from './hive-data';

export interface HiveEntityProps {
	id: string;
	name: string;
	apiary: ApiaryEntityProps;
	data: HiveDataEntityProps[];
}

export const HiveEntity = new EntitySchema<HiveEntityProps>({
	name: 'hive',
	tableName: 'hives',
	columns: {
		id: {
			type: 'uuid',
			primary: true,
		},
		name: {
			type: 'varchar',
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
			inverseSide: 'hives',
		},
		data: {
			type: 'one-to-many',
			target: 'hiveData',
			cascade: true,
			inverseSide: 'hive',
		},
	},
});
