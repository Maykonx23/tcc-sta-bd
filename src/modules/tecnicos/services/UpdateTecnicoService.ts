import { Cliente } from '@modules/clientes/typeorm/entities/Cliente';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Tecnico } from '../typeorm/entities/Tecnico';
import { TecnicosRepository } from '../typeorm/repositories/TecnicosRepository';

interface IRequest {
    id: string;
    descricao: string;
    avaliacao: number;
    cliente_id: Cliente;
}

export class UpdateTecnicoService {
    public async execute({
        id,
        descricao,
        avaliacao,
        cliente_id,
    }: IRequest): Promise<Tecnico> {
        const tecnicosRepository = getCustomRepository(TecnicosRepository);

        const tecnico = await tecnicosRepository.findOne(id);

        if (!tecnico) {
            throw new AppError('Tecnico não existe.');
        }

        tecnico.descricao = descricao;
        tecnico.avaliacao = avaliacao;
        tecnico.cliente = cliente_id;

        await tecnicosRepository.save(tecnico);

        return tecnico;
    }
}
