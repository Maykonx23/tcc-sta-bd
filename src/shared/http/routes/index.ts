import chatsRouter from "@modules/chats/routes/chats.routes";
import clientesRouter from "@modules/clientes/routes/Clientes.routes";
import sessionsRouter from "@modules/clientes/routes/sessions.routes";
import enderecosRouter from "@modules/enderecos/routes/enderecos.routes";
import servicosRouter from "@modules/servicos/routes/Servicos.routes";
import solicitacaoServicosRouter from "@modules/solicitacaoServicos/routes/SolicitacaoServicos.routes";
import tecnicosRouter from "@modules/tecnicos/routes/Tecnicos.routes";
import { Router } from "express";

export const routes = Router();

routes.use("/enderecos", enderecosRouter);
routes.use("/clientes", clientesRouter);
routes.use("/tecnicos", tecnicosRouter);
routes.use("/servicos", servicosRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/chat", chatsRouter);
routes.use("/solicitacao-servico", solicitacaoServicosRouter);
