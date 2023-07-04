import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateApiaryDataTable1688391675714 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'apiary_data',
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
						name: 'lux',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'atmos_pressure',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'lat',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'lon',
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
						columnNames: ['apiary_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'apiaries',
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('apiary_data');
	}
}
