import { getCustomRepository } from 'typeorm';
import { Cliente } from '../typeorm/entities/Cliente';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';

export class ListClienteService {
    public async execute(): Promise<Cliente[]> {
        const clienteRepository = getCustomRepository(ClientesRepository);

        const clientes = await clienteRepository.find({
            relations: ['endereco'],
        });

        return clientes;
    }
}
