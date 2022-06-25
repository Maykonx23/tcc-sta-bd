import { Endereco } from '@modules/enderecos/typeorm/entities/Endereco';
import { EntityRepository, Repository } from 'typeorm';
import { string } from 'yup';
import { Cliente } from '../entities/Cliente';

interface IRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    data_nasc: Date;
    telefone: string;
    avaliacao: number;
    nivel: string;
    endereco: Endereco;
}

interface ICliente {
    id: string;
}

@EntityRepository(Cliente)
export class ClientesRepository extends Repository<Cliente> {
    public async findByPass(password: string): Promise<Cliente | undefined> {
        const cliente = await this.findOne(password);

        return cliente;
    }

    public async findById(id: string): Promise<Cliente | undefined> {
        const cliente = await this.findOne(id, {
            relations: ['endereco'],
        });

        return cliente;
    }

    public async findByEmail(email: string): Promise<Cliente | undefined> {
        const cliente = await this.findOne({
            where: { email },
            relations: ['endereco'],
        });

        return cliente;
    }

    public async findByCpf(cpf: string): Promise<Cliente | undefined> {
        const cliente = await this.findOne({ where: { cpf } });

        return cliente;
    }

    public async createCliente({
        name,
        email,
        password,
        cpf,
        data_nasc,
        telefone,
        avaliacao,
        nivel,
        endereco,
    }: IRequest): Promise<Cliente> {
        const cliente = this.create({
            name,
            email,
            password,
            cpf,
            data_nasc,
            telefone,
            avaliacao,
            nivel,
            endereco,
        });

        await this.save(cliente);

        return cliente;
    }

    public async findByNivel({ id }: ICliente): Promise<Cliente | undefined> {
        const cliente = await this.findOne(id);

        return cliente;
    }
}
