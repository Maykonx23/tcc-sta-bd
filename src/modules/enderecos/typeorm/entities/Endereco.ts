import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('enderecos')
export class Endereco {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cep: string;

    @Column()
    uf: string;

    @Column()
    cidade: string;

    @Column()
    bairro: string;

    @Column()
    rua: string;

    @Column('int8')
    numero: number;

    @Column()
    complemento: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
