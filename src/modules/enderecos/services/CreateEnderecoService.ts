import { getCustomRepository } from 'typeorm';
import { Endereco } from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosReposutiries';

interface IRequest {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    numero: number;
    complemento: string;
}

export class CreateEnderecoService {
    public async execute({
        cep,
        rua,
        bairro,
        cidade,
        uf,
        numero,
        complemento,
    }: IRequest): Promise<Endereco> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const endereco = enderecosRepository.create({
            cep,
            rua,
            bairro,
            cidade,
            uf,
            numero,
            complemento,
        });

        await enderecosRepository.save(endereco);

        return endereco;
    }
}
