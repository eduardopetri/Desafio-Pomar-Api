import { MigrationInterface, QueryRunner } from "typeorm";

export default class UpdateRelationBetweenTreesAndTreesGroup1608393554006
  implements MigrationInterface {
  name = "UpdateRelationBetweenTreesAndTreesGroup1608393554006";

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
      `CREATE TABLE "trees_groups_trees_trees" ("treesGroupsId" integer NOT NULL, "treesId" integer NOT NULL, PRIMARY KEY ("treesGroupsId", "treesId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60b7342bde62fbb08baa415fcf" ON "trees_groups_trees_trees" ("treesGroupsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_65960375c5fadd2e0564da6497" ON "trees_groups_trees_trees" ("treesId") `
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "users"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(`DROP INDEX "IDX_60b7342bde62fbb08baa415fcf"`);
    await queryRunner.query(`DROP INDEX "IDX_65960375c5fadd2e0564da6497"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_trees_groups_trees_trees" ("treesGroupsId" integer NOT NULL, "treesId" integer NOT NULL, CONSTRAINT "FK_60b7342bde62fbb08baa415fcfc" FOREIGN KEY ("treesGroupsId") REFERENCES "trees_groups" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_65960375c5fadd2e0564da64971" FOREIGN KEY ("treesId") REFERENCES "trees" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("treesGroupsId", "treesId"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees_groups_trees_trees"("treesGroupsId", "treesId") SELECT "treesGroupsId", "treesId" FROM "trees_groups_trees_trees"`
    );
    await queryRunner.query(`DROP TABLE "trees_groups_trees_trees"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_trees_groups_trees_trees" RENAME TO "trees_groups_trees_trees"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60b7342bde62fbb08baa415fcf" ON "trees_groups_trees_trees" ("treesGroupsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_65960375c5fadd2e0564da6497" ON "trees_groups_trees_trees" ("treesId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_65960375c5fadd2e0564da6497"`);
    await queryRunner.query(`DROP INDEX "IDX_60b7342bde62fbb08baa415fcf"`);
    await queryRunner.query(
      `ALTER TABLE "trees_groups_trees_trees" RENAME TO "temporary_trees_groups_trees_trees"`
    );
    await queryRunner.query(
      `CREATE TABLE "trees_groups_trees_trees" ("treesGroupsId" integer NOT NULL, "treesId" integer NOT NULL, PRIMARY KEY ("treesGroupsId", "treesId"))`
    );
    await queryRunner.query(
      `INSERT INTO "trees_groups_trees_trees"("treesGroupsId", "treesId") SELECT "treesGroupsId", "treesId" FROM "temporary_trees_groups_trees_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees_groups_trees_trees"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_65960375c5fadd2e0564da6497" ON "trees_groups_trees_trees" ("treesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60b7342bde62fbb08baa415fcf" ON "trees_groups_trees_trees" ("treesGroupsId") `
    );
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(`DROP INDEX "IDX_65960375c5fadd2e0564da6497"`);
    await queryRunner.query(`DROP INDEX "IDX_60b7342bde62fbb08baa415fcf"`);
    await queryRunner.query(`DROP TABLE "trees_groups_trees_trees"`);
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
