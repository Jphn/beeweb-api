import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1684152713426 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'firstName',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'lastName',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'isAdmin',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'now()',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
