import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class CreateRelacaoTabelas1651194165306 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /* Inicio Chaves estrangeira Chats */
        await queryRunner.addColumn(
            "chats",
            new TableColumn({
                name: "solicitacaoServico_id",
                type: "uuid",
            })
        );

        await queryRunner.createForeignKey(
            "chats",
            new TableForeignKey({
                name: "solicitacaoServico_id",
                referencedTableName: "solicitacaoServicos",
                referencedColumnNames: ["id"],
                columnNames: ["solicitacaoServico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        /* Fim Chaves estrangeira Chats */
        /* Inicio Chaves estrangeira Clientes */
        await queryRunner.addColumn(
            "clientes",
            new TableColumn({
                name: "endereco_id",
                type: "uuid",
            })
        );
        await queryRunner.addColumn(
            "clientes",
            new TableColumn({
                name: "solicitacao_servico_id",
                type: "uuid",
                isNullable: true,
            })
        );
        await queryRunner.createForeignKey(
            "clientes",
            new TableForeignKey({
                name: "endereco_id",
                referencedTableName: "enderecos",
                referencedColumnNames: ["id"],
                columnNames: ["endereco_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "clientes",
            new TableForeignKey({
                name: "solicitacao_servico_id",
                referencedTableName: "solicitacaoServicos",
                referencedColumnNames: ["id"],
                columnNames: ["solicitacao_servico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        /* Fim Chaves estrangeira Clientes */

        /* Inicio Chaves estrangeira Solicitação Serviço */
        await queryRunner.addColumn(
            "solicitacaoServicos",
            new TableColumn({ name: "chat_id", type: "uuid", isNullable: true })
        );
        await queryRunner.addColumn(
            "solicitacaoServicos",
            new TableColumn({ name: "tecnico_id", type: "uuid" })
        );
        await queryRunner.addColumn(
            "solicitacaoServicos",
            new TableColumn({ name: "servico_id", type: "uuid" })
        );
        await queryRunner.addColumn(
            "solicitacaoServicos",
            new TableColumn({ name: "cliente_id", type: "uuid" })
        );

        await queryRunner.createForeignKey(
            "solicitacaoServicos",
            new TableForeignKey({
                name: "chat_id",
                referencedTableName: "chats",
                referencedColumnNames: ["id"],
                columnNames: ["chat_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "solicitacaoServicos",
            new TableForeignKey({
                name: "tecnico_id",
                referencedTableName: "tecnicos",
                referencedColumnNames: ["id"],
                columnNames: ["tecnico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "solicitacaoServicos",
            new TableForeignKey({
                name: "servico_id",
                referencedTableName: "servicos",
                referencedColumnNames: ["id"],
                columnNames: ["servico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "solicitacaoServicos",
            new TableForeignKey({
                name: "cliente_id",
                referencedTableName: "clientes",
                referencedColumnNames: ["id"],
                columnNames: ["cliente_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
            /* Fim Chaves estrangeira Solicitação Serviço */
        );

        /* Inicio Chaves estrangeira Solicitação Tecnicos */

        await queryRunner.addColumn(
            "tecnicos",
            new TableColumn({
                name: "servico_id",
                type: "uuid",
                isNullable: true,
            })
        );
        await queryRunner.addColumn(
            "tecnicos",
            new TableColumn({
                name: "cliente_id",
                type: "uuid",
                isNullable: true,
            })
        );
        await queryRunner.createForeignKey(
            "tecnicos",
            new TableForeignKey({
                name: "servico_id",
                referencedTableName: "servicos",
                referencedColumnNames: ["id"],
                columnNames: ["servico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "tecnicos",
            new TableForeignKey({
                name: "cliente_id",
                referencedTableName: "clientes",
                referencedColumnNames: ["id"],
                columnNames: ["cliente_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        /* Fim Chaves estrangeira Solicitação Tecnicos  */

        /* Inicio Chaves estrangeira Serviço  */
        await queryRunner.addColumn(
            "servicos",
            new TableColumn({
                name: "tecnico_id",
                type: "uuid",
            })
        );
        await queryRunner.createForeignKey(
            "servicos",
            new TableForeignKey({
                name: "tecnico_id",
                referencedTableName: "tecnicos",
                referencedColumnNames: ["id"],
                columnNames: ["tecnico_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
        /* Fim Chaves estrangeira Serviço  */

        /* Inicio Chaves estrangeira Solicitação Serviço  */
        /* Fim Chaves estrangeira Solicitação Serviço  */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /* Inicio Chaves estrangeira Clientes */
        await queryRunner.dropForeignKey("clientes", "endereco_id");
        await queryRunner.dropForeignKey("clientes", "solicitacao_servico_id");

        await queryRunner.dropColumn("clientes", "endereco_id");
        await queryRunner.dropColumn("clientes", "solicitacao_servico_id");

        /* Fim Chaves estrangeira Clientes */

        /* inicio Chaves estrangeira Solicitação Serviço  */
        await queryRunner.dropForeignKey("solicitacaoServicos", "chat_id");
        await queryRunner.dropForeignKey("solicitacaoServicos", "tecnico_id");
        await queryRunner.dropForeignKey("solicitacaoServicos", "servico_id");
        await queryRunner.dropForeignKey("solicitacaoServicos", "cliente_id");

        await queryRunner.dropColumn("solicitacaoServicos", "chat_id");
        await queryRunner.dropColumn("solicitacaoServicos", "tecnico_id");
        await queryRunner.dropColumn("solicitacaoServicos", "servico_id");
        await queryRunner.dropColumn("solicitacaoServicos", "cliente_id");
        /* Fim Chaves estrangeira Solicitação Serviço  */

        /* Inicio Chaves estrangeira Tecnicos  */
        await queryRunner.dropForeignKey("tecnicos", "servico_id");
        await queryRunner.dropForeignKey("tecnicos", "cliente_id");

        await queryRunner.dropColumn("tecnicos", "servico_id");
        await queryRunner.dropColumn("tecnicos", "cliente_id");
        /* Fim Chaves estrangeira Tecnicos  */

        /* Inicio Chaves estrangeira Serviços  */
        await queryRunner.dropForeignKey("servicos", "tecnico_id");

        await queryRunner.dropColumn("tecnicos", "tecnico_id");
        /* Fim Chaves estrangeira Serviços  */
    }
}
