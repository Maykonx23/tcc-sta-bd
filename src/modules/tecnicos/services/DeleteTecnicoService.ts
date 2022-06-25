import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { TecnicosRepository } from '../typeorm/repositories/TecnicosRepository';
interface IRequest {
    id: string;
}

export class DeleteTecnicoService {
    public async execute({ id }: IRequest): Promise<void> {
        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnico = await tecnicosRepository.findOne(id, {
            relations: ['cliente'],
        });

        if (!tecnico) {
            throw new AppError('Produto não existe.');
        }

        await tecnicosRepository.remove(tecnico);
    }
}
