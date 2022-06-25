import { Tecnico } from "../../../tecnicos/typeorm/entities/Tecnico";
import { Cliente } from "../../../clientes/typeorm/entities/Cliente";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Chat } from "../../../chats/typeorm/entities/Chat";
import { Servico } from "../../../servicos/typeorm/entities/Servico";

@Entity("solicitacaoServicos")
export class SolicitacaoServico {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    status: string;

    @Column()
    validacao: string;

    @OneToOne(() => Servico)
    @JoinColumn({ name: "servico_id" })
    servicos: Servico;

    @OneToOne(() => Tecnico)
    @JoinColumn({ name: "tecnico_id" })
    tecnico: Tecnico;

    @OneToOne(() => Cliente)
    @JoinColumn({ name: "cliente_id" })
    cliente: Cliente;

    @OneToMany(() => Chat, (chat) => chat.solicitacaoServico)
    @JoinColumn({ name: "chat_id" })
    chats: Chat[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
