import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'professor';

export class CreateTableProfessor1710184470000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },

          //

          {
            name: 'nome',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'matricula_siape',
            type: 'text',
            isNullable: true,
          },

          //

          {
            name: 'dateCreateOperator()d',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'dateUpdateOperator()d',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },

          {
            name: 'date_deleted',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_dateUpdateOperator()d_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_dateUpdateOperator()d();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
