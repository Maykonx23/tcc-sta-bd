import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Servico } from "../typeorm/entities/Servico";
import { ServicosRepository } from "../typeorm/repositories/ServicosRepository";

interface IRequest {
    id: string;
}

export class ShowServicoService {
    public async execute({ id }: IRequest): Promise<Servico> {
        const servicosRepository = getCustomRepository(ServicosRepository);

        const servico = await servicosRepository.findById(id);

        if (!servico) {
            throw new AppError("Servico não existe.");
        }

        return servico;
    }
}
