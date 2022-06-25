import { Endereco } from '../../../enderecos/typeorm/entities/Endereco';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column()
    data_nasc: Date;

    @Column()
    telefone: string;

    @Column('int')
    avaliacao: number;

    @Column()
    nivel: string;

    @OneToOne(() => Endereco, {
        cascade: true,
    })
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
