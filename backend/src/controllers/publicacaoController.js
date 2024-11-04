import Publicacao from "../models/publicacaoModel.js"
import { literal } from "sequelize"

export const getAll = async (request, response) =>{
    //1° buscar informações de publicações
    try {
        const publicacao = await  Publicacao.findAll({
            raw: true,
            attributes:[
                "id",
                "titulo",
                "local",
                "cidade",
                "imagem",
                //adicionar likes
                [literal(`(
                    SELECT COUNT(*) FROM curtidas WHERE curtidas.publicacao_id = publicacao_id AND curtidas.tipo_avaliacao = 'up'
                )`), "Total Likes"],
                // [literal(`()`), "Total deslikes"],
                // [literal(`()`), "Total Comentarios"]
            ]
        })
        response.status(200).json(publicacao)
    } catch (error) {
        console.error(error)
        response.status(500).json({message: "Erro ao buscar publicação"})
    }
    //2° buscar likes individualmente
    //3° buscar deslikes individualmente
    //4° buscar comentarios individualmente
}