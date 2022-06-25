import { TecnicosRepository } from "@modules/tecnicos/typeorm/repositories/TecnicosRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Servico } from "../typeorm/entities/Servico";
import { ServicosRepository } from "../typeorm/repositories/ServicosRepository";

interface IRequest {
    titulo: string;
    mediaTempo: string;
    descricao: string;
    price: number;
    tecnico_id: string;
}

export class CreateServicoService {
    public async execute({
        titulo,
        mediaTempo,
        descricao,
        price,
        tecnico_id,
    }: IRequest): Promise<Servico> {
        const servicosRepository = getCustomRepository(ServicosRepository);

        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnicoExists = await tecnicosRepository.findById(tecnico_id);

        if (!tecnicoExists) {
            throw new AppError("Esse Tecnico não existe.");
        }

        const servico = await servicosRepository.createServico({
            titulo,
            mediaTempo,
            descricao,
            price,
            tecnico: tecnicoExists,
        });

        await servicosRepository.save(servico);

        return servico;
    }
}
