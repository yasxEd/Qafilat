import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReportsTable1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reports",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "content",
            type: "text",
            isNullable: false,
          },
          {
            name: "agencyId",
            type: "uuid",
            isNullable: false,
          },
        ],
        // Optionally, you can add a foreign key constraint to agencyId:
        // foreignKeys: [
        //   {
        //     columnNames: ["agencyId"],
        //     referencedTableName: "agencies",
        //     referencedColumnNames: ["id"],
        //     onDelete: "CASCADE",
        //   },
        // ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reports");
  }
}