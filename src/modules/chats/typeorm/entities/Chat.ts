import { SolicitacaoServico } from "../../../solicitacaoServicos/typeorm/entities/SolicitacaoServico";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("chats")
export class Chat {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    descricao: string;

    @Column()
    usuario: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @ManyToOne(
        () => SolicitacaoServico,
        (solicitacaoServicos) => solicitacaoServicos.chats
    )
    @JoinColumn({ name: "solicitacaoServico_id" })
    solicitacaoServico: SolicitacaoServico;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
