import { Request, Response } from 'express';
import { ClienteIDTecnicoService } from '../services/ClienteIDTecnicoServices';
import { CreateTecnicoService } from '../services/CreateTecnicoServices';
import { DeleteTecnicoService } from '../services/DeleteTecnicoService';
import { ListTecnicoService } from '../services/ListTecnicoService';
import { ShowTecnicoService } from '../services/ShowTecnicoService';
import { UpdateTecnicoService } from '../services/UpdateTecnicoService';

export default class TecnicoController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listTecnicos = new ListTecnicoService();

        const tecnico = await listTecnicos.execute();

        return response.json(tecnico);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showTecnico = new ShowTecnicoService();

        const tecnico = await showTecnico.execute({ id });

        return response.json(tecnico);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { descricao, avaliacao, cliente_id, servicos } = request.body;

        const createTecnico = new CreateTecnicoService();

        const tecnico = await createTecnico.execute({
            descricao,
            avaliacao,
            cliente_id,
            servicos,
        });

        return response.json(tecnico);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { descricao, avaliacao, cliente_id } = request.body;

        const { id } = request.params;

        const updateTecnico = new UpdateTecnicoService();

        const tecnico = await updateTecnico.execute({
            id,
            descricao,
            avaliacao,
            cliente_id,
        });

        return response.json(tecnico);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteTecnico = new DeleteTecnicoService();

        await deleteTecnico.execute({ id });

        return response.json([]);
    }

    public async showCliente(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const showIDClienteTecnico = new ClienteIDTecnicoService();

        const tecnico = await showIDClienteTecnico.execute({ id });

        return response.json(tecnico);
    }
}
