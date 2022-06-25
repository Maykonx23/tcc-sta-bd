import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ServicosRepository } from '../typeorm/repositories/ServicosRepository';

interface IRequest {
    id: string;
}

export class DeleteServicoService {
    public async execute({ id }: IRequest): Promise<void> {
        const servicoRepository = getCustomRepository(ServicosRepository);

        const servico = await servicoRepository.findOne(id, {
            relations: ['tecnico'],
        });

        if (!servico) {
            throw new AppError('Servico não existe.');
        }

        await servicoRepository.remove(servico);
    }
}
