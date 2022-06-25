import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { SolicitacaoServico } from "../typeorm/entities/SolicitacaoServico";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

interface IRequest {
    id: string;
}

export class ShowSolicitacaoServicoService {
    public async execute({ id }: IRequest): Promise<SolicitacaoServico> {
        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServicos = await solicitacaoServicoRepository.findById(
            id
        );

        if (!solicitacaoServicos) {
            throw new AppError("Solicitação não existe.");
        }

        return solicitacaoServicos;
    }
}
