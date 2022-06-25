import { Request, Response } from 'express';
import { CreateServicoService } from '../services/CreateServicoServices';
import { DeleteServicoService } from '../services/DeleteServicoService';
import { ListServicoService } from '../services/ListServicoService';
import { ShowServicoService } from '../services/ShowServicoService';
import { UpdateServicoService } from '../services/UpdateServicoService';

export default class ServicoController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listServicos = new ListServicoService();

        const servico = await listServicos.execute();

        return response.json(servico);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showServico = new ShowServicoService();

        const servico = await showServico.execute({ id });

        return response.json(servico);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { titulo, mediaTempo, descricao, price, tecnico_id } =
            request.body;

        const createServico = new CreateServicoService();

        const servico = await createServico.execute({
            titulo,
            mediaTempo,
            descricao,
            price,
            tecnico_id,
        });

        return response.json(servico);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { titulo, mediaTempo, descricao, price, tecnico_id } =
            request.body;

        const { id } = request.params;

        const updateServico = new UpdateServicoService();

        const servico = await updateServico.execute({
            id,
            titulo,
            mediaTempo,
            descricao,
            price,
            tecnico_id,
        });

        return response.json(servico);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteServico = new DeleteServicoService();

        await deleteServico.execute({ id });

        return response.json([]);
    }
}
