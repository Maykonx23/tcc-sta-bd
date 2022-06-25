import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Tecnico } from '../typeorm/entities/Tecnico';
import { TecnicosRepository } from '../typeorm/repositories/TecnicosRepository';

interface IRequest {
    id: string;
}

export class ShowTecnicoService {
    public async execute({ id }: IRequest): Promise<Tecnico> {
        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnico = await tecnicosRepository.findById(id);

        if (!tecnico) {
            throw new AppError('Tecnico não existe.');
        }

        return tecnico;
    }
}
