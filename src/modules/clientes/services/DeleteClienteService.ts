import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';
interface IRequest {
    id: string;
}

export class DeleteClienteService {
    public async execute({ id }: IRequest): Promise<void> {
        const clienteRepository = getCustomRepository(ClientesRepository);

        const cliente = await clienteRepository.findOne(id, {
            relations: ['endereco'],
        });

        if (!cliente) {
            throw new AppError('Produto não existe.');
        }

        await clienteRepository.remove(cliente);
    }
}
