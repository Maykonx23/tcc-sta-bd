import { Tecnico } from "@modules/tecnicos/typeorm/entities/Tecnico";
import { EntityRepository, Repository } from "typeorm";
import { Servico } from "../entities/Servico";
interface IRequest {
    titulo: string;
    mediaTempo: string;
    descricao: string;
    price: number;
    tecnico: Tecnico;
}

@EntityRepository(Servico)
export class ServicosRepository extends Repository<Servico> {
    public async findById(id: string): Promise<Servico | undefined> {
        const servico = await this.findOne(id, {
            relations: ["tecnico"],
        });

        return servico;
    }

    public async createServico({
        titulo,
        mediaTempo,
        descricao,
        price,
        tecnico,
    }: IRequest): Promise<Servico> {
        const servico = this.create({
            titulo,
            mediaTempo,
            descricao,
            price,
            tecnico,
        });

        await this.save(servico);

        return servico;
    }
}
