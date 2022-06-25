import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SolicitacaoServicoController from "../controllers/SolicitacaoServicoController";

const solicitacaoServicosRouter = Router();
const solicitacaoServicoController = new SolicitacaoServicoController();

solicitacaoServicosRouter.get("/", solicitacaoServicoController.index);

solicitacaoServicosRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    solicitacaoServicoController.show
);

solicitacaoServicosRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            status: Joi.string().required(),
            validacao: Joi.number().required(),
            cliente_id: Joi.required().required(),
            tecnico_id: Joi.required().required(),
            servico_id: Joi.required().required(),
        },
    }),
    solicitacaoServicoController.create
);

solicitacaoServicosRouter.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            status: Joi.string(),
            validacao: Joi.number(),
            cliente_id: Joi.string(),
            tecnico_id: Joi.string(),
            servico_id: Joi.string(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    solicitacaoServicoController.update
);

solicitacaoServicosRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    solicitacaoServicoController.delete
);

solicitacaoServicosRouter.get(
    "/cliente/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    solicitacaoServicoController.showCliente
);

solicitacaoServicosRouter.get(
    "/tecnico/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    solicitacaoServicoController.showTecnico
);

export default solicitacaoServicosRouter;
