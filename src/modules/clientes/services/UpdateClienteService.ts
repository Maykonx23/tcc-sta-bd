import { Endereco } from '@modules/enderecos/typeorm/entities/Endereco';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Cliente } from '../typeorm/entities/Cliente';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    data_nasc: Date;
    telefone: string;
    avaliacao: number;
    nivel: string;
    endereco_id: Endereco;
}

export class UpdateClienteService {
    public async execute({
        id,
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
        const clienteRepository = getCustomRepository(ClientesRepository);

        const cliente = await clienteRepository.findOne(id);

        if (!cliente) {
            throw new AppError('Produto não existe.');
        }

        const emailExists = await clienteRepository.findByEmail(email);

        if (emailExists && email != cliente.email) {
            throw new AppError('Email já cadastrado.');
        }

        const cpfExists = await clienteRepository.findByCpf(cpf);

        if (cpfExists && email != cliente.cpf) {
            throw new AppError('CPF já cadastrado.');
        }

        cliente.name = name;
        cliente.email = email;
        cliente.password = password;
        cliente.data_nasc = data_nasc;
        cliente.telefone = telefone;
        cliente.avaliacao = avaliacao;
        cliente.nivel = nivel;
        cliente.endereco = endereco_id;
        await clienteRepository.save(cliente);

        return cliente;
    }
}
