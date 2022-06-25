import { getCustomRepository } from 'typeorm';
import { Servico } from '../typeorm/entities/Servico';
import { ServicosRepository } from '../typeorm/repositories/ServicosRepository';

export class ListServicoService {
    public async execute(): Promise<Servico[]> {
        const servicosRepository = getCustomRepository(ServicosRepository);

        const servico = await servicosRepository.find({
            relations: ['tecnico'],
        });

        return servico;
    }
}
