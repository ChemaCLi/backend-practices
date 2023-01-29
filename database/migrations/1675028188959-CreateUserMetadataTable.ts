import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserMetadataTable1675028188959 implements MigrationInterface {
    name = 'CreateUserMetadataTable1675028188959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_metadata" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "bio" character varying(1200), "image" character varying(1200), "birthday" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_95b47e0556d2c793455e00dd916" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_metadata"`);
    }

}
