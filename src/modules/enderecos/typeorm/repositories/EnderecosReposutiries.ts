import { EntityRepository, Repository } from "typeorm";
import { Endereco } from "../entities/Endereco";

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {
    public async findByCep(cep: string): Promise<Endereco | undefined> {
        const endereco = this.findOne({ where: { cep } });
        return endereco;
    }

    public async findById(id: string): Promise<Endereco | undefined> {
        const endereco = this.findOne({ where: { id } });

        return endereco;
    }
}
