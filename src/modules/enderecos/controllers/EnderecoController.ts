import { Request, Response } from "express";
import { CreateEnderecoService } from "../services/CreateEnderecoService";
import { DeleteEnderecoService } from "../services/DeleteEnderecoService";
import { ListEnderecoService } from "../services/ListEnderecoService";
import { ShowCepEnderecoService } from "../services/ShowCepEnderecoService";
import { ShowEnderecoService } from "../services/ShowEnderecoService";
import { UpdateEnderecoService } from "../services/UpdateEnderecoService";

export default class EnderecoController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const listEnderecos = new ListEnderecoService();

        const enderecos = await listEnderecos.execute();

        return response.json(enderecos);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showEndereco = new ShowEnderecoService();

        const endereco = await showEndereco.execute({ id });

        return response.json(endereco);
    }

    public async showCep(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cep } = request.params;

        const showCepEndereco = new ShowCepEnderecoService();

        const endereco = await showCepEndereco.execute({ cep });

        return response.json(endereco);
    }

    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cep, rua, bairro, cidade, uf, numero, complemento } =
            request.body;

        const createEndereco = new CreateEnderecoService();

        const endereco = await createEndereco.execute({
            cep,
            rua,
            bairro,
            cidade,
            uf,
            numero,
            complemento,
        });

        return response.json(endereco);
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cep, uf, cidade, bairro, rua, numero, complemento } =
            request.body;

        const { id } = request.params;

        const updateEndereco = new UpdateEnderecoService();

        const endereco = await updateEndereco.execute({
            id,
            cep,
            uf,
            cidade,
            bairro,
            rua,
            numero,
            complemento,
        });

        return response.json(endereco);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        const deleteEndereco = new DeleteEnderecoService();

        await deleteEndereco.execute({ id });

        return response.json([]);
    }
}
