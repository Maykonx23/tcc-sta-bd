import { Cliente } from "../../../clientes/typeorm/entities/Cliente";
import { EntityRepository, Repository } from "typeorm";
import { SolicitacaoServico } from "../entities/SolicitacaoServico";
import { Servico } from "../../../servicos/typeorm/entities/Servico";
import { Tecnico } from "../../../tecnicos/typeorm/entities/Tecnico";
import { Chat } from "@modules/chats/typeorm/entities/Chat";

interface IChats {
    id: string;
    cliente: string;
    tecnico: string;
}

interface IRequest {
    status: string;
    validacao: string;
    cliente: Cliente;
    servicos: Servico;
    tecnico: Tecnico;
    chats: IChats[];
}

interface ICliente {
    id: string;
}

interface ITecnico {
    id: string;
}

@EntityRepository(SolicitacaoServico)
export class SolicitacaoServicosRepository extends Repository<SolicitacaoServico> {
    public async findById(id: string): Promise<SolicitacaoServico | undefined> {
        const solicitacaoServico = await this.findOne(id, {
            relations: ["cliente", "servicos", "tecnico", "chats"],
        });
        return solicitacaoServico;
    }

    public async findByIdCliente({
        id,
    }: ICliente): Promise<SolicitacaoServico[]> {
        const solicitacaoServico = await this.find({
            where: { cliente: { id } },
            relations: ["cliente", "servicos", "tecnico", "chats"],
        });

        return solicitacaoServico;
    }

    public async findByIdTecnico({
        id,
    }: ITecnico): Promise<SolicitacaoServico[]> {
        const solicitacaoServico = await this.find({
            where: { tecnico: { id } },
            relations: ["cliente", "servicos", "tecnico", "chats"],
        });

        return solicitacaoServico;
    }

    public async createSolicitacaoServico({
        status,
        validacao,
        cliente,
        servicos,
        tecnico,
        chats,
    }: IRequest): Promise<SolicitacaoServico> {
        const solicitacaoServico = this.create({
            status,
            validacao,
            cliente,
            servicos,
            tecnico,
            chats,
        });

        await this.save(solicitacaoServico);

        return solicitacaoServico;
    }
}
