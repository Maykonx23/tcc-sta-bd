import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Endereco } from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosReposutiries';

interface IRequest {
    id: string;
}

export class ShowEnderecoService {
    public async execute({ id }: IRequest): Promise<Endereco> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const endereco = await enderecosRepository.findOne(id);

        if (!endereco) {
            throw new AppError('Endereço não existe.');
        }

        return endereco;
    }
}
