import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ChatRepository } from "../typeorm/repositories/ChatsReposutiries";

interface IRequest {
    id: string;
}

export class DeleteChatService {
    public async execute({ id }: IRequest): Promise<void> {
        const chatsRepository = getCustomRepository(ChatRepository);

        const chat = await chatsRepository.findOne(id);

        if (!chat) {
            throw new AppError("Chat não existe.");
        }

        await chatsRepository.remove(chat);
    }
}
