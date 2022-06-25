import { Cliente } from '../../../clientes/typeorm/entities/Cliente';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Servico } from '../../../servicos/typeorm/entities/Servico';

@Entity('tecnicos')
export class Tecnico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @Column()
    avaliacao: number;

    @OneToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @OneToMany(() => Servico, servico => servico.tecnico)
    @JoinColumn({ name: 'servico_id' })
    servicos: Servico[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
