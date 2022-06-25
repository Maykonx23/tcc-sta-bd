import { EnderecoRepository } from '@modules/enderecos/typeorm/repositories/EnderecosReposutiries';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { Cliente } from '../typeorm/entities/Cliente';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    data_nasc: Date;
    telefone: string;
    avaliacao: number;
    nivel: string;
    endereco_id: string;
}

export class CreateClienteService {
    public async execute({
        name,
        email,
        password,
        cpf,
        data_nasc,
        telefone,
        avaliacao,
        nivel,
        endereco_id,
    }: IRequest): Promise<Cliente> {
        const clientesRepository = getCustomRepository(ClientesRepository);

        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const enderecoExists = await enderecosRepository.findById(endereco_id);

        const emailExists = await clientesRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email já cadastrado.');
        }

        const cpfExists = await clientesRepository.findByCpf(cpf);

        if (cpfExists) {
            throw new AppError('CPF já cadastrado.');
        }
        if (!enderecoExists) {
            throw new AppError('Esse CEP não existe.');
        }

        const hashPassword = await hash(password, 8);

        const cliente = await clientesRepository.createCliente({
            name,
            email,
            password: hashPassword,
            cpf,
            data_nasc,
            telefone,
            avaliacao,
            nivel,
            endereco: enderecoExists,
        });

        await clientesRepository.save(cliente);

        return cliente;
    }
}
