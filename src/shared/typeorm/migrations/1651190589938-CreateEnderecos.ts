import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEnderecos1651190589938 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enderecos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                    },

                    {
                        name: 'uf',
                        type: 'varchar',
                    },
                    {
                        name: 'cidade',
                        type: 'varchar',
                    },
                    {
                        name: 'bairro',
                        type: 'varchar',
                    },
                    {
                        name: 'rua',
                        type: 'varchar',
                    },
                    {
                        name: 'numero',
                        type: 'int8',
                        isNullable: true,
                    },
                    {
                        name: 'complemento',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enderecos');
    }
}
