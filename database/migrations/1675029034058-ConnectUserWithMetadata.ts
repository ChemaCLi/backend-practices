import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConnectUserWithMetadata1675029034058
  implements MigrationInterface
{
  name = 'ConnectUserWithMetadata1675029034058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users_metadata" ADD "user_id" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "users_metadata" ADD CONSTRAINT "UQ_e8e8402acae80d29b641aef9b05" UNIQUE ("user_id")',
    );
    await queryRunner.query(
      'ALTER TABLE "users_metadata" ADD CONSTRAINT "FK_e8e8402acae80d29b641aef9b05" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users_metadata" DROP CONSTRAINT "FK_e8e8402acae80d29b641aef9b05"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_metadata" DROP CONSTRAINT "UQ_e8e8402acae80d29b641aef9b05"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_metadata" DROP COLUMN "user_id"',
    );
  }
}
