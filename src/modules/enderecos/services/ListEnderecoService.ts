import { getCustomRepository } from 'typeorm';
import { Endereco } from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosReposutiries';

export class ListEnderecoService {
    public async execute(): Promise<Endereco[]> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const enderecos = await enderecosRepository.find();

        return enderecos;
    }
}
