import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersApiariesTable1686749577867 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_apiaries',
				columns: [
					{
						name: 'user_id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'apiary_id',
						type: 'uuid',
						isPrimary: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
						onDelete: 'CASCADE',
					},
					{
						columnNames: ['apiary_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'apiaries',
						onDelete: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_apiaries');
	}
}
