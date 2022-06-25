import { create } from 'domain';
import { Request, Response } from 'express';
import { LoginClienteService } from '../services/LoginClienteServices';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSession = new LoginClienteService();

        const cliente = await createSession.execute({
            email,
            password,
        });

        return response.json(cliente);
    }
}
