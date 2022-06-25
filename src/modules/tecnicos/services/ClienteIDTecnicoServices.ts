import { getCustomRepository } from 'typeorm';
import { Tecnico } from '../typeorm/entities/Tecnico';
import { TecnicosRepository } from '../typeorm/repositories/TecnicosRepository';

interface IRequest {
    id: string;
}

export class ClienteIDTecnicoService {
    public async execute({ id }: IRequest): Promise<Tecnico[]> {
        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnico = await tecnicosRepository.findByIdCliente({
            id,
        });

        return tecnico;
    }
}
