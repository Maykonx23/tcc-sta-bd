import { SolicitacaoServico } from "@modules/solicitacaoServicos/typeorm/entities/SolicitacaoServico";
import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../entities/Chat";

interface IRequest {
    descricao: string;
    usuario: string;
    name: string;
    type: string;
    solicitacaoServico: SolicitacaoServico;
}

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    public async findByUsuario(usuario: string): Promise<Chat | undefined> {
        const chat = this.findOne({ where: { usuario } });
        return chat;
    }

    public async findById(id: string): Promise<Chat | undefined> {
        const chat = this.findOne({
            where: { id },
            relations: ["solicitacaoServico"],
        });

        return chat;
    }

    public async createChat({
        descricao,
        usuario,
        name,
        type,
        solicitacaoServico,
    }: IRequest): Promise<Chat> {
        const chat = this.create({
            descricao,
            usuario,
            name,
            type,
            solicitacaoServico,
        });

        await this.save(chat);

        return chat;
    }
}
