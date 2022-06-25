import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ClientesRepository } from '../typeorm/repositories/ClientesRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Cliente } from '../typeorm/entities/Cliente';
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    cliente: Cliente;
    token: string;
}

export class LoginClienteService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const clientesRepository = getCustomRepository(ClientesRepository);

        const cliente = await clientesRepository.findByEmail(email);

        if (!cliente) {
            throw new AppError('Email/Senha invalido.', 401);
        }

        const passAccept = await compare(password, cliente.password);

        if (!passAccept) {
            throw new AppError('Email/Senha invalido.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: cliente.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { cliente, token };
    }
}
