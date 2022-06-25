import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSolicitacaoServicos1651193676529
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'solicitacaoServicos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },

                    {
                        name: 'validacao',
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
        await queryRunner.dropTable('solicitacaoServicos');
    }
}
