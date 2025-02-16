import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "oferta_formacao";

export class CreateTableOfertaFormacao1710184310042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          //
          {
            name: "nome",
            type: "text",
            isNullable: false,
          },
          {
            name: "slug",
            type: "text",
            isNullable: false,
          },
          {
            name: "id_modalidade_fk",
            type: "uuid",
            isNullable: false,
          },
          //
          {
            name: "date_created",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_updated",
            type: "timestamptz",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "date_deleted",
            type: "timestamptz",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__modalidade`,
            columnNames: ["id_modalidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "modalidade",
          },
        ],
      }),
    );

    await queryRunner.query(
      `
            CREATE TRIGGER change_date_updated_table_${tableName}
            BEFORE UPDATE ON ${tableName}
            FOR EACH ROW
            EXECUTE FUNCTION change_date_updated();
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
