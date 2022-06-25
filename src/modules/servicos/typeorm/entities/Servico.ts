import { Tecnico } from '../../../tecnicos/typeorm/entities/Tecnico';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('servicos')
export class Servico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    mediaTempo: string;

    @Column()
    descricao: string;

    @Column('decimal')
    price: number;

    @ManyToOne(() => Tecnico, tecnico => tecnico.servicos)
    @JoinColumn({ name: 'tecnico_id' })
    tecnico: Tecnico;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
