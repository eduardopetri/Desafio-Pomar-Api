import { MigrationInterface, QueryRunner } from "typeorm";

export default class UpdateRelationBetweenTreesAndHarvest1608394038513
  implements MigrationInterface {
  name = "UpdateRelationBetweenTreesAndHarvest1608394038513";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "users"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" integer NOT NULL, "harvest_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tree_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_harvests"("id", "informations", "weight", "harvest_date", "created_at", "updated_at") SELECT "id", "informations", "weight", "harvest_date", "created_at", "updated_at" FROM "harvests"`
    );
    await queryRunner.query(`DROP TABLE "harvests"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_harvests" RENAME TO "harvests"`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "users"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" integer NOT NULL, "harvest_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tree_id" integer NOT NULL, CONSTRAINT "FK_f71b5dd18e92527957640d93d13" FOREIGN KEY ("tree_id") REFERENCES "trees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_harvests"("id", "informations", "weight", "harvest_date", "created_at", "updated_at", "tree_id") SELECT "id", "informations", "weight", "harvest_date", "created_at", "updated_at", "tree_id" FROM "harvests"`
    );
    await queryRunner.query(`DROP TABLE "harvests"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_harvests" RENAME TO "harvests"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvests" RENAME TO "temporary_harvests"`
    );
    await queryRunner.query(
      `CREATE TABLE "harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" integer NOT NULL, "harvest_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "tree_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "harvests"("id", "informations", "weight", "harvest_date", "created_at", "updated_at", "tree_id") SELECT "id", "informations", "weight", "harvest_date", "created_at", "updated_at", "tree_id" FROM "temporary_harvests"`
    );
    await queryRunner.query(`DROP TABLE "temporary_harvests"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(
      `ALTER TABLE "harvests" RENAME TO "temporary_harvests"`
    );
    await queryRunner.query(
      `CREATE TABLE "harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" integer NOT NULL, "harvest_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `INSERT INTO "harvests"("id", "informations", "weight", "harvest_date", "created_at", "updated_at") SELECT "id", "informations", "weight", "harvest_date", "created_at", "updated_at" FROM "temporary_harvests"`
    );
    await queryRunner.query(`DROP TABLE "temporary_harvests"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
  }
}
