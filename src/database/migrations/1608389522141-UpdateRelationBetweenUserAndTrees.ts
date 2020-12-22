import { MigrationInterface, QueryRunner } from "typeorm";

export default class UpdateRelationBetweenUserAndTrees1608389522141
  implements MigrationInterface {
  name = "UpdateRelationBetweenUserAndTrees1608389522141";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "user_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "species", "created_at", "updated_at") SELECT "id", "description", "age", "species", "created_at", "updated_at" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" integer NOT NULL, "harvest_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
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
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "species", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "species", "created_at", "updated_at", "user_id" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_trees_groups" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees_groups"("id", "name", "description", "created_at", "updated_at") SELECT "id", "name", "description", "created_at", "updated_at" FROM "trees_groups"`
    );
    await queryRunner.query(`DROP TABLE "trees_groups"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_trees_groups" RENAME TO "trees_groups"`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "species", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "species", "created_at", "updated_at", "user_id" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "species", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "species", "created_at", "updated_at", "user_id" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
    await queryRunner.query(
      `ALTER TABLE "trees_groups" RENAME TO "temporary_trees_groups"`
    );
    await queryRunner.query(
      `CREATE TABLE "trees_groups" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`
    );
    await queryRunner.query(
      `INSERT INTO "trees_groups"("id", "name", "description", "created_at", "updated_at") SELECT "id", "name", "description", "created_at", "updated_at" FROM "temporary_trees_groups"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees_groups"`);
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "user_id" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "species", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "species", "created_at", "updated_at", "user_id" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(
      `ALTER TABLE "harvests" RENAME TO "temporary_harvests"`
    );
    await queryRunner.query(
      `CREATE TABLE "harvests" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "informations" varchar NOT NULL, "weight" decimal(2,10) NOT NULL, "harvest_date" timestamp NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`
    );
    await queryRunner.query(
      `INSERT INTO "harvests"("id", "informations", "weight", "harvest_date", "created_at", "updated_at") SELECT "id", "informations", "weight", "harvest_date", "created_at", "updated_at" FROM "temporary_harvests"`
    );
    await queryRunner.query(`DROP TABLE "temporary_harvests"`);
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "species", "created_at", "updated_at") SELECT "id", "description", "age", "species", "created_at", "updated_at" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
  }
}
