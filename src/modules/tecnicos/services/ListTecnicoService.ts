import { getCustomRepository } from 'typeorm';
import { Tecnico } from '../typeorm/entities/Tecnico';
import { TecnicosRepository } from '../typeorm/repositories/TecnicosRepository';

export class ListTecnicoService {
    public async execute(): Promise<Tecnico[]> {
        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnico = await tecnicosRepository.find({
            relations: ['cliente', 'servicos'],
        });

        return tecnico;
    }
}
