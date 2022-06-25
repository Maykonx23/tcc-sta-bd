import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Endereco } from "../typeorm/entities/Endereco";
import { EnderecoRepository } from "../typeorm/repositories/EnderecosReposutiries";

interface IRequest {
    cep: string;
}

export class ShowCepEnderecoService {
    public async execute({ cep }: IRequest): Promise<Endereco> {
        const enderecosRepository = getCustomRepository(EnderecoRepository);

        const endereco = await enderecosRepository.findByCep(cep);

        if (!endereco) {
            throw new AppError("Cep não existe.");
        }

        return endereco;
    }
}
