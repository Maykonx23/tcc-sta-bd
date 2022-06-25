import { ClientesRepository } from "@modules/clientes/typeorm/repositories/ClientesRepository";
import { SolicitacaoServicosRepository } from "@modules/solicitacaoServicos/typeorm/repositories/SolicitacaoServicosRepository";
import { TecnicosRepository } from "@modules/tecnicos/typeorm/repositories/TecnicosRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Chat } from "../typeorm/entities/Chat";
import { ChatRepository } from "../typeorm/repositories/ChatsReposutiries";

interface IRequest {
    id: string;
    descricao: string;
    usuario: string;
    name: string;
    type: string;
    solicitacaoServico_id: string;
}

export class UpdateChatService {
    public async execute({
        id,
        descricao,
        usuario,
        name,
        type,
        solicitacaoServico_id,
    }: IRequest): Promise<Chat> {
        const chatsRepository = getCustomRepository(ChatRepository);

        const solicitacaoServicosRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );
        const solicitacaoServico = await solicitacaoServicosRepository.findById(
            solicitacaoServico_id
        );

        if (!solicitacaoServico) {
            throw new AppError("Solicitação não existe.");
        }

        const chat = await chatsRepository.findOne(id);

        if (!chat) {
            throw new AppError("Chat não existe.");
        }

        chat.descricao = descricao;
        chat.usuario = usuario;
        chat.name = name;
        chat.type = type;
        chat.solicitacaoServico = solicitacaoServico;

        await chatsRepository.save(chat);

        return chat;
    }
}
