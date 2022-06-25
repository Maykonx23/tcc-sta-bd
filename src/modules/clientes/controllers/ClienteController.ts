import { Request, Response } from 'express';
import { CreateClienteService } from '../services/CreateClienteServices';
import { DeleteClienteService } from '../services/DeleteClienteService';
import { ListClienteService } from '../services/ListClienteService';
import { LoginClienteService } from '../services/LoginClienteServices';
import { ShowClienteService } from '../services/ShowClienteService';
import { UpdateClienteService } from '../services/UpdateClienteService';

export default class ClienteController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listClientes = new ListClienteService();

        const cliente = await listClientes.execute();

        return response.json(cliente);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCliente = new ShowClienteService();

        const cliente = await showCliente.execute({ id });

        return response.json(cliente);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            email,
            password,
            cpf,
            data_nasc,
            telefone,
            avaliacao,
            nivel,
            endereco_id,
        } = request.body;

        const createCliente = new CreateClienteService();

        const cliente = await createCliente.execute({
            name,
            email,
            password,
            cpf,
            data_nasc,
            telefone,
            avaliacao,
            nivel,
            endereco_id,
        });

        return response.json(cliente);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            email,
            password,
            cpf,
            data_nasc,
            telefone,
            avaliacao,
            nivel,
            endereco_id,
        } = request.body;

        const { id } = request.params;

        const updateCliente = new UpdateClienteService();

        const cliente = await updateCliente.execute({
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
        });

        return response.json(cliente);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteCliente = new DeleteClienteService();

        await deleteCliente.execute({ id });

        return response.json([]);
    }
}
