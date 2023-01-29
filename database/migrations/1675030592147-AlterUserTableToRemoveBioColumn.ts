import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTableToRemoveBioColumn1675030592147 implements MigrationInterface {
    name = 'AlterUserTableToRemoveBioColumn1675030592147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying(1200)`);
        await queryRunner.query(`UPDATE users SET bio = (SELECT bio FROM users_metadata as um WHERE users.id = um.user_id)`);
    }
}
