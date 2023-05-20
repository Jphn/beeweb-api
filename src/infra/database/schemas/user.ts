import { EntitySchema } from 'typeorm';
import { UserCreateProps } from '../../../app/entities/user';

export type UserSchema = {
	id: string;
} & UserCreateProps;

export const UserEntity = new EntitySchema<UserSchema>({
	name: 'users',
	columns: {
		id: {
			type: 'uuid',
			primary: true,
		},
		firstName: {
			type: 'varchar',
			nullable: false,
		},
		lastName: {
			type: 'varchar',
			nullable: false,
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
		},
	},
});
