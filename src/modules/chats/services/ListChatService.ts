import { getCustomRepository } from "typeorm";
import { Chat } from "../typeorm/entities/Chat";
import { ChatRepository } from "../typeorm/repositories/ChatsReposutiries";

export class ListChatService {
    public async execute(): Promise<Chat[]> {
        const chatsRepository = getCustomRepository(ChatRepository);

        const chats = await chatsRepository.find({
            relations: ["solicitacaoServico"],
        });

        return chats;
    }
}
