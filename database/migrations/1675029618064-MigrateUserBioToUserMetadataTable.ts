import { MigrationInterface, QueryRunner } from "typeorm"

export class MigrateUserBioToUserMetadataTable1675029618064 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users_metadata (bio, user_id)
            SELECT users.bio, users.id FROM users
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
