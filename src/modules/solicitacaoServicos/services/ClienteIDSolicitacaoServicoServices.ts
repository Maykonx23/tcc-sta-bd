import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { SolicitacaoServico } from "../typeorm/entities/SolicitacaoServico";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

interface IRequest {
    id: string;
}

export class ClienteIDSolicitacaoServicoService {
    public async execute({ id }: IRequest): Promise<SolicitacaoServico[]> {
        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServico =
            await solicitacaoServicoRepository.findByIdCliente({
                id,
            });

        if (!solicitacaoServico) {
            throw new AppError("Cliente não existe.");
        }

        return solicitacaoServico;
    }
}
