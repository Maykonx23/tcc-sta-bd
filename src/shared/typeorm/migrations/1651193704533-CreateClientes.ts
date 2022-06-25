import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClientes1651193704533 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clientes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },

                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'data_nasc',
                        type: 'date',
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                    },
                    {
                        name: 'avaliacao',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'nivel',
                        type: 'varchar',
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
        await queryRunner.dropTable('clientes');
    }
}
