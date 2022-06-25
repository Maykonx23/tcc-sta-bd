import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ServicoController from '../controllers/ServicoController';

const servicosRouter = Router();
const servicoController = new ServicoController();

servicosRouter.get('/', servicoController.index);

servicosRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    servicoController.show,
);

servicosRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            titulo: Joi.string().required(),
            mediaTempo: Joi.string().required(),
            descricao: Joi.string().required(),
            price: Joi.number().required(),
            tecnico_id: Joi.required(),
        },
    }),
    servicoController.create,
);

servicosRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            titulo: Joi.string(),
            mediaTempo: Joi.string(),
            descricao: Joi.string(),
            price: Joi.number(),
            tecnico_id: Joi.string(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    servicoController.update,
);

servicosRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    servicoController.delete,
);

export default servicosRouter;
