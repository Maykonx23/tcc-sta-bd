import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosReposutiries';

interface IRequest {
    id: string;
}

export class DeleteEnderecoService {
    public async execute({ id }: IRequest): Promise<void> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const endereco = await enderecosRepository.findOne(id);

        if (!endereco) {
            throw new AppError('Produto não existe.');
        }

        await enderecosRepository.remove(endereco);
    }
}
