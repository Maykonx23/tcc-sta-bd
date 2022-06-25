import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Endereco } from '../typeorm/entities/Endereco';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosReposutiries';

interface IRequest {
    id: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
}

export class UpdateEnderecoService {
    public async execute({
        id,
        cep,
        uf,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
    }: IRequest): Promise<Endereco> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const endereco = await enderecosRepository.findOne(id);

        if (!endereco) {
            throw new AppError('Produto não existe.');
        }

        endereco.cep = cep;
        endereco.uf = uf;
        endereco.cidade = cidade;
        endereco.bairro = bairro;
        endereco.rua = rua;
        endereco.numero = numero;
        endereco.complemento = complemento;

        await enderecosRepository.save(endereco);

        return endereco;
    }
}
