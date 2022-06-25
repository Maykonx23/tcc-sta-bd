import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

interface IRequest {
    id: string;
}

export class DeleteSolicitacaoServicoService {
    public async execute({ id }: IRequest): Promise<void> {
        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServico = await solicitacaoServicoRepository.findOne(
            id,
            {
                relations: ["cliente", "servicos", "tecnico", "chats"],
            }
        );

        if (!solicitacaoServico) {
            throw new AppError("Solicitação não existe.");
        }

        await solicitacaoServicoRepository.remove(solicitacaoServico);
    }
}
