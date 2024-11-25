import express from "express";
import cors from "cors";

import conn from "./config/conn.js";

//Models
import Empresa from "./models/empresaModel.js";
import Publicacao from "./models/publicacaoModel.js";
import Usuario from "./models/usuarioModel.js";
import Curtida from "./models/curtidaModel.js";
import Comentario from "./models/comentarioModel.js";

//Rotas
import empresaRoute from "./routes/empresaRouter.js";
import publicacaoRouter from "./routes/publicacaoRouter.js";
import usuarioRouter from "./routes/usuarioRouter.js";
import comentarioRouter from "./routes/comentarioRouter.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conn
  .sync()
  .then(() => {
    console.log("Conectado");
  })
  .catch((err) => console.error(err));

app.use("/api/empresas", empresaRoute);
app.use("/api/publicacoes", publicacaoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/comentarios", comentarioRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;
