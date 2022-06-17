import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1655352768610 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        length: '255',
        isNullable: false,
      },
      {
        name: 'login',
        type: 'varchar',
        isUnique: true,
        length: '80',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '80',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestampz',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestampz',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestampz',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}

