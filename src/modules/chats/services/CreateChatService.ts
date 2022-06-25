import { SolicitacaoServicosRepository } from "@modules/solicitacaoServicos/typeorm/repositories/SolicitacaoServicosRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Chat } from "../typeorm/entities/Chat";
import { ChatRepository } from "../typeorm/repositories/ChatsReposutiries";

interface IRequest {
    descricao: string;
    usuario: string;
    name: string;
    type: string;
    solicitacaoServico_id: string;
}

export class CreateChatService {
    public async execute({
        descricao,
        usuario,
        name,
        type,
        solicitacaoServico_id,
    }: IRequest): Promise<Chat> {
        const chatsRepository = getCustomRepository(ChatRepository);

        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServicoExists =
            await solicitacaoServicoRepository.findById(solicitacaoServico_id);

        if (!solicitacaoServicoExists) {
            throw new AppError("Essa Solicitação não existe.");
        }

        const chat = await chatsRepository.createChat({
            descricao,
            usuario,
            name,
            type,
            solicitacaoServico: solicitacaoServicoExists,
        });

        await chatsRepository.save(chat);

        return chat;
    }
}
