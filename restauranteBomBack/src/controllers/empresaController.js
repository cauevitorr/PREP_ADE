import Empresa from "../models/empresaModel.js";
import Curtida from "../models/curtidaModel.js";


export const getEmpresa = async (request, response) => {
  try {
    const infoEmpresa = await Empresa.findAll({raw: true});

    const likes = await Curtida.count({
      where: {
        tipo_avaliacao: "up",
      },
    });

    const deslikes = await Curtida.count({
      where: {
        tipo_avaliacao: "down",
      },
    });

    const empresa = {
      id: infoEmpresa[0].id,
      nome: infoEmpresa[0].nome,
      imagem: infoEmpresa[0].imagem,
      likes,
      deslikes,
    };

    response.status(200).json(empresa);
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Erro ao buscar dados da empresa" });
  }
};