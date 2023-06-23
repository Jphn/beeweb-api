import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHivesTable1686744918472 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'hives',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'apiary_id',
						type: 'uuid',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
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
		await queryRunner.dropTable('hives');
	}
}
