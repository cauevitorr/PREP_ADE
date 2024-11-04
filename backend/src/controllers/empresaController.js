import Curtida from "../models/curtidaModel.js"
import Empresa from "../models/empresaModel.js"

export const getEmpresa = async (request, response) => {

    //1° Buscar informações da empresa -> tabela_empresa
    try {
        // const infoEmpresa02 = await Empresa.findAll({ raw: true })
        // const infoEmpresa03 = await Empresa.findOne({ raw: true, where: { id: 1 } })
        const infoEmpresa = await Empresa.findByPk(1, { raw: true })

        //2° Contar a quantidade de likes da tabela curtida
        const likes = await Curtida.count({
            where: {
                tipo_avaliacao: "up"
            }
        })
        //3° Contar quantidade de deslikes da tabela curtida
        const deslikes = await Curtida.count({
            where: {
                tipo_avaliacao: "down"
            }
        })
        infoEmpresa.likes = likes
        infoEmpresa.deslikes = deslikes
        response.status(200).json(infoEmpresa)
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Erro ao buscar dados da empresa" })
    }
}