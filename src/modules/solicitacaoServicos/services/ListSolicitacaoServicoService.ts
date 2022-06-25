import { getCustomRepository } from "typeorm";
import { SolicitacaoServico } from "../typeorm/entities/SolicitacaoServico";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

export class ListSolicitacaoServicoService {
    public async execute(): Promise<SolicitacaoServico[]> {
        const solicitacaoServicosRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const solicitacaoServicos = await solicitacaoServicosRepository.find({
            relations: ["cliente", "servicos", "tecnico", "chats"],
        });

        return solicitacaoServicos;
    }
}
