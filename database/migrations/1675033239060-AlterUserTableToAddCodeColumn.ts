import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTableToAddCodeColumn1675033239060
  implements MigrationInterface
{
  name = 'AlterUserTableToAddCodeColumn1675033239060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ADD "code" character varying(6)',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "code"');
  }
}
