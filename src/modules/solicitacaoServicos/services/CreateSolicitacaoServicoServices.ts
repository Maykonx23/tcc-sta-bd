import { ClientesRepository } from "@modules/clientes/typeorm/repositories/ClientesRepository";
import { ServicosRepository } from "@modules/servicos/typeorm/repositories/ServicosRepository";
import { TecnicosRepository } from "@modules/tecnicos/typeorm/repositories/TecnicosRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { SolicitacaoServico } from "../typeorm/entities/SolicitacaoServico";
import { SolicitacaoServicosRepository } from "../typeorm/repositories/SolicitacaoServicosRepository";

interface IChats {
    id: string;
    cliente: string;
    tecnico: string;
}

interface IRequest {
    status: string;
    validacao: string;
    cliente_id: string;
    servico_id: string;
    tecnico_id: string;
    chats: IChats[];
}

export class CreateSolicitacaoServicoService {
    public async execute({
        status,
        validacao,
        cliente_id,
        servico_id,
        tecnico_id,
        chats,
    }: IRequest): Promise<SolicitacaoServico> {
        const solicitacaoServicoRepository = getCustomRepository(
            SolicitacaoServicosRepository
        );

        const clientesRepository = getCustomRepository(ClientesRepository);

        const servicosRepository = getCustomRepository(ServicosRepository);

        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const clienteExists = await clientesRepository.findById(cliente_id);

        if (!clienteExists) {
            throw new AppError("Esse Cliente não existe.");
        }

        const servicoExists = await servicosRepository.findById(servico_id);

        if (!servicoExists) {
            throw new AppError("Esse Servico não existe.");
        }

        const tecnicoExists = await tecnicosRepository.findById(tecnico_id);

        if (!tecnicoExists) {
            throw new AppError("Esse Tecnico não existe.");
        }

        const solicitacaoServico =
            await solicitacaoServicoRepository.createSolicitacaoServico({
                status,
                validacao,
                cliente: clienteExists,
                servicos: servicoExists,
                tecnico: tecnicoExists,
                chats,
            });

        await solicitacaoServicoRepository.save(solicitacaoServico);

        return solicitacaoServico;
    }
}
