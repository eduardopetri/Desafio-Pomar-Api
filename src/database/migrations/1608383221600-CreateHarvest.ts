import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateHarvest1608383221600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "harvests",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "informations",
            type: "varchar",
          },
          {
            name: "weight",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "harvest_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("harvests");
  }
}
