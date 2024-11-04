import express from "express"
import cors from "cors"

import conn from "./config/conn.js"

import Empresa from "./models/empresaModel.js"
import Usuario from "./models/usuarioModel.js"
import Publicacao from "./models/publicacaoModel.js"
import Curtida from "./models/curtidaModel.js"
import Comentario from "./models/comentarioModel.js"

import EmpresaRouter from "./routers/empresaRouter.js"
import PublicacaoRouter from "./routers/publicacaoRouter.js"

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// {force: true}
conn.sync().then().catch((error)=> console.log(error))

app.use("/api/empresas", EmpresaRouter)
app.use("/api/publicacoes", PublicacaoRouter)

app.use((request,response)=>{
    response.status(404).json({message: "Rota não encontrada."})
})

export default app