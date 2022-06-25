import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { SolicitacaoServico } from "../typeorm/entities/SolicitacaoServico";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

interface IRequest {
    id: string;
}

export class TecnicoIDSolicitacaoServicoServices {
    public async execute({ id }: IRequest): Promise<SolicitacaoServico[]> {
        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServico =
            await solicitacaoServicoRepository.findByIdTecnico({
                id,
            });

        if (!solicitacaoServico) {
            throw new AppError("Tecnico não existe.");
        }

        return solicitacaoServico;
    }
}
