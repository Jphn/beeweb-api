import { EntitySchema } from 'typeorm';
import { UserCreateProps } from '../../../app/entities/user';
import { ApiaryEntityProps } from './apiary';

export type UserEntityProps = {
	id: string;
	apiaries: ApiaryEntityProps[];
} & UserCreateProps;

export const UserEntity = new EntitySchema<UserEntityProps>({
	name: 'user',
	tableName: 'users',
	columns: {
		id: {
			type: 'uuid',
			primary: true,
		},
		firstName: {
			type: 'varchar',
			nullable: false,
			name: 'first_name',
		},
		lastName: {
			type: 'varchar',
			nullable: false,
			name: 'last_name',
		},
		email: {
			type: 'varchar',
			unique: true,
			nullable: false,
		},
		password: {
			type: 'varchar',
			nullable: false,
		},
		isAdmin: {
			type: 'boolean',
			nullable: false,
			name: 'is_admin',
		},
	},
	relations: {
		apiaries: {
			type: 'many-to-many',
			target: 'apiary',
			inverseSide: 'users',
			joinTable: {
				name: 'users_apiaries',
				joinColumn: {
					name: 'user_id',
				},
				inverseJoinColumn: {
					name: 'apiary_id',
				},
			},
		},
	},
});
