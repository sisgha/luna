import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'diario_professor';

export class CreateTableDiarioProfessor1710185001807 implements MigrationInterface {
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
            name: 'situacao',
            type: 'bool',
            isNullable: false,
          },

          {
            name: 'id_diario_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
          {
            name: 'id_vinculo_professor_fk',
            type: 'uuid',
            isNullable: false,
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
        foreignKeys: [
          {
            name: `fk__${tableName}__relaciona__diario`,
            columnNames: ['id_diario_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'diario',
          },
          {
            name: `fk__${tableName}__relaciona__vinculo_professor`,
            columnNames: ['id_vinculo_professor_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario_vinculo_campus',
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
