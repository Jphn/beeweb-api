import { EntitySchema } from 'typeorm';
import { ApiaryProps } from '../../../app/entities/apiary';
import { HiveEntityProps } from './hive';
import { UserEntityProps } from './user';

export type ApiaryEntityProps = {
	id: string;
	users: UserEntityProps[];
	hives: HiveEntityProps[];
} & ApiaryProps;

export const ApiaryEntity = new EntitySchema<ApiaryEntityProps>({
	name: 'apiary',
	tableName: 'apiaries',
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
		users: {
			type: 'many-to-many',
			target: 'user',
			inverseSide: 'apiaries',
			joinTable: {
				name: 'users_apiaries',
				joinColumn: {
					name: 'apiary_id',
				},
				inverseJoinColumn: {
					name: 'user_id',
				},
			},
		},
		hives: {
			type: 'one-to-many',
			target: 'hive',
			cascade: true,
			inverseSide: 'apiary',
		},
	},
});
