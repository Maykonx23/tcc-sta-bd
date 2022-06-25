import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClienteController from "../controllers/ClienteController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const clientesRouter = Router();
const clienteController = new ClienteController();

clientesRouter.get("/", isAuthenticated, clienteController.index);

clientesRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    clienteController.show
);

clientesRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            cpf: Joi.string().required(),
            data_nasc: Joi.date().required(),
            telefone: Joi.string().required(),
            avaliacao: Joi.number(),
            nivel: Joi.string().required(),
            endereco_id: Joi.required(),
        },
    }),
    clienteController.create
);

clientesRouter.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            cpf: Joi.string(),
            data_nasc: Joi.date(),
            telefone: Joi.string(),
            avaliacao: Joi.number(),
            nivel: Joi.string(),
            endereco_id: Joi.string(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    clienteController.update
);

clientesRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    clienteController.delete
);

export default clientesRouter;
