import { MigrationInterface, QueryRunner } from "typeorm";

export default class UpdateRelationBetweenTreesAndSpecies1608393164410
  implements MigrationInterface {
  name = "UpdateRelationBetweenTreesAndSpecies1608393164410";

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
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "specie_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "specie_id", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "species", "created_at", "updated_at", "user_id" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "users"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "specie_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "specie_id", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "specie_id", "created_at", "updated_at", "user_id" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "specie_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ba91bd35413003c2f381d7e2caf" FOREIGN KEY ("specie_id") REFERENCES "species" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_trees"("id", "description", "age", "specie_id", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "specie_id", "created_at", "updated_at", "user_id" FROM "trees"`
    );
    await queryRunner.query(`DROP TABLE "trees"`);
    await queryRunner.query(`ALTER TABLE "temporary_trees" RENAME TO "trees"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "specie_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "specie_id", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "specie_id", "created_at", "updated_at", "user_id" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "specie_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "specie_id", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "specie_id", "created_at", "updated_at", "user_id" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`
    );
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(`ALTER TABLE "trees" RENAME TO "temporary_trees"`);
    await queryRunner.query(
      `CREATE TABLE "trees" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "age" integer NOT NULL, "species" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" integer NOT NULL, CONSTRAINT "FK_78a354a6d1831da4281f2e1600f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "trees"("id", "description", "age", "species", "created_at", "updated_at", "user_id") SELECT "id", "description", "age", "specie_id", "created_at", "updated_at", "user_id" FROM "temporary_trees"`
    );
    await queryRunner.query(`DROP TABLE "temporary_trees"`);
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
