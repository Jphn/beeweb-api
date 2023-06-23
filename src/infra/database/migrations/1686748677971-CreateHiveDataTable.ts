import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHiveDataTable1686748677971 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'hive_data',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'hive_id',
						type: 'uuid',
					},
					{
						name: 'temp',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'humidity',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'weight',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'lux',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'noise',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						columnNames: ['hive_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'hives',
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('hive_data');
	}
}
