import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Chat } from "../typeorm/entities/Chat";
import { ChatRepository } from "../typeorm/repositories/ChatsReposutiries";
interface IRequest {
    id: string;
}

export class ShowChatService {
    public async execute({ id }: IRequest): Promise<Chat> {
        const chatsRepository = getCustomRepository(ChatRepository);

        const chat = await chatsRepository.findOne(id);

        if (!chat) {
            throw new AppError("Chat não existe.");
        }

        return chat;
    }
}
