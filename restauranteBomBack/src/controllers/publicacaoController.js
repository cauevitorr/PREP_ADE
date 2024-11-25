import Publicacao from "../models/publicacaoModel.js";
import Comentario from "../models/comentarioModel.js";
import Curtida from "../models/curtidaModel.js";
import { literal } from "sequelize";

import getToken from "../helper/get-token.js";
import getUserByToken from "../helper/get-user-by-token.js";

export const getAll = async (request, response) => {
  try {
    const publicacoes = await Publicacao.findAll({
      attributes: [
        "id",
        "titulo",
        "local",
        "cidade",
        "imagem",
        //Adicionar likes
        [
          literal(`(
          SELECT COUNT(*) FROM curtidas
          WHERE curtidas.publicacao_id = publicacoes.id
          AND curtidas.tipo_avaliacao = 'up'
        )`),
          "Total Likes",
        ],
        //Adicionar Dislikes
        [
          literal(`(
          SELECT COUNT(*) FROM curtidas
          WHERE curtidas.publicacao_id = publicacoes.id
          AND curtidas.tipo_avaliacao = 'down'
        )`),
          "Total Dislikes",
        ],
        //Adicionar Comentários
        [
          literal(`(
          SELECT COUNT(*) FROM comentarios
          WHERE comentarios.publicacao_id = publicacoes.id
        )`),
          "Total Comentários",
        ],
      ],
      // group: ['publicacoes.id']
    });

    response.status(200).json(publicacoes);
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Erro ao buscar publicações" });
  }
};

export const getPublicacao = async (request, response) => {
  const { id } = request.params;

  try {
    const publicacacoes = await Publicacao.findOne({
      raw: true,
      where: { id },
      attributes: [
        "id",
        "titulo",
        "local",
        "cidade",
        "imagem",
        [
          literal(`(
          SELECT COUNT(*)
          FROM curtidas
          WHERE curtidas.publicacao_id = publicacoes.id
          AND curtidas.tipo_avaliacao = 'up'
        )`),
          "Total Likes",
        ],
        [
          literal(`(
          SELECT COUNT(*)
          FROM curtidas
          WHERE curtidas.publicacao_id = publicacoes.id
          AND curtidas.tipo_avaliacao = 'down'
        )`),
          "Total Deslikes",
        ],
        [
          literal(`(
          SELECT COUNT(*)
          FROM comentarios
          WHERE comentarios.publicacao_id = publicacoes.id
        )`),
          "Total Comentarios",
        ],
      ],
    });

    const comentariosPublicacao = await Comentario.findAll({
      raw: true,
      where: {
        publicacao_id: publicacacoes.id,
      },
    });

    //add propriedade comentários no objeto publicação
    publicacacoes.comentarios = comentariosPublicacao;

    response.status(200).json(publicacacoes);
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Erro ao buscar uma publicação" });
  }
};

export const like = async (request, response) => {
  const id = request.params.id;
  const tipo_avaliacao = "up";

  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);

    const curtir = await Curtida.findOne({
      where: { publicacao_id: id, usuario_id: usuario.id },
    });

    if (!curtir) {
      await Curtida.create({
        tipo_avaliacao,
        publicacao_id: id,
        usuario_id: usuario.id,
      });
      return response.status(200).json({ message: "Curtir" });
    } else {
      await Curtida.destroy({ where: { usuario_id: usuario.id } });
      return response.status(200).json({ message: "Remover Curtir" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ err: "Erro ao curtir publicação" });
  }
};

export const deslike = async (request, response) => {
  const id = request.params.id;
  const tipo_avaliacao = "down";

  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);

    const curtir = await Curtida.findOne({
      where: { publicacao_id: id, usuario_id: usuario.id },
    });

    if (!curtir) {
      await Curtida.create({
        tipo_avaliacao,
        publicacao_id: id,
        usuario_id: usuario.id,
      });
      return response.status(200).json({ message: "Descurtir" });
    } else {
      await Curtida.destroy({ where: { usuario_id: usuario.id } });
      return response.status(200).json({ message: "Remover Descurtir" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ err: "Erro ao curtir publicação" });
  }
};
