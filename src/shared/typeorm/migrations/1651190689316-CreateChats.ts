import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChats1651190689316 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chats",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "descricao",
                        type: "text",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },

                    {
                        name: "usuario",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("chats");
    }
}
