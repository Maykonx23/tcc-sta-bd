import { Tecnico } from '@modules/tecnicos/typeorm/entities/Tecnico';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Servico } from '../typeorm/entities/Servico';
import { ServicosRepository } from '../typeorm/repositories/ServicosRepository';

interface IRequest {
    id: string;
    titulo: string;
    mediaTempo: string;
    descricao: string;
    price: number;
    tecnico_id: Tecnico;
}

export class UpdateServicoService {
    public async execute({
        id,
        titulo,
        mediaTempo,
        descricao,
        price,
        tecnico_id,
    }: IRequest): Promise<Servico> {
        const servicosRepository = getCustomRepository(ServicosRepository);

        const servico = await servicosRepository.findOne(id);

        if (!servico) {
            throw new AppError('Servico não existe.');
        }

        servico.titulo = titulo;
        servico.mediaTempo = mediaTempo;
        servico.descricao = descricao;
        servico.price = price;
        servico.tecnico = tecnico_id;

        await servicosRepository.save(servico);

        return servico;
    }
}
