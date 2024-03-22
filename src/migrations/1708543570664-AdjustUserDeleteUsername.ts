import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
} from "typeorm";

export class AdjustUserDeleteUsername1708543570664
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
      }),
    );
  }
}
