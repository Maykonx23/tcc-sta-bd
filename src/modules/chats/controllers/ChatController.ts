import { Request, Response } from "express";
import { CreateChatService } from "../services/CreateChatService";
import { DeleteChatService } from "../services/DeleteChatService";
import { ListChatService } from "../services/ListChatService";
import { ShowChatService } from "../services/ShowChatService";
import { UpdateChatService } from "../services/UpdateChatService";

export default class ChatController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const listChats = new ListChatService();

        const chats = await listChats.execute();

        return response.json(chats);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showChat = new ShowChatService();

        const chat = await showChat.execute({ id });

        return response.json(chat);
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { descricao, usuario, name, type, solicitacaoServico_id } =
            request.body;

        const createChat = new CreateChatService();

        const chat = await createChat.execute({
            descricao,
            usuario,
            name,
            type,
            solicitacaoServico_id,
        });

        return response.json(chat);
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { descricao, usuario, name, type, solicitacaoServico_id } =
            request.body;

        const { id } = request.params;

        const updateChat = new UpdateChatService();

        const chat = await updateChat.execute({
            id,
            descricao,
            usuario,
            name,
            type,
            solicitacaoServico_id,
        });

        return response.json(chat);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        const deleteChat = new DeleteChatService();

        await deleteChat.execute({ id });

        return response.json([]);
    }
}
