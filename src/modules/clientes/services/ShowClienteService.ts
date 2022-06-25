import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Cliente } from '../typeorm/entities/Cliente';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';

interface IRequest {
    id: string;
}

export class ShowClienteService {
    public async execute({ id }: IRequest): Promise<Cliente> {
        const clienteRepository = getCustomRepository(ClientesRepository);

        const cliente = await clienteRepository.findById(id);

        if (!cliente) {
            throw new AppError('Cliente não existe.');
        }

        return cliente;
    }
}
