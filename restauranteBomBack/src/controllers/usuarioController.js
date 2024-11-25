import Usuario from "../models/usuarioModel.js";
import conn from "../config/conn.js";
import Publicacoes from "../models/publicacaoModel.js";
import Curtida from "../models/curtidaModel.js";

//helpers
import createUserToken from "../helper/create-user-token.js";
import getToken from "../helper/get-token.js";
import getUserByToken from "../helper/get-user-by-token.js";

// export const create = async (request, response) => {
//   const { nome, email, nickname, senha, imagem } = request.body;

//   try {
//     await Usuario.create({ nome, email, nickname, senha, imagem });
//     response.status(201).json({ msg: "Create" });
//   } catch (error) {
//     response.status(500).json({ err: "err" });
//   }
// };

export const login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      response.status(400).json({ err: "Usuário não encontrado" });
      return;
    }

    const verificaSenha = await Usuario.findByPk(usuario.id);
    if (verificaSenha.senha !== senha) {
      response.status(400).json({ err: "Senha não confere" });
      return;
    }

    createUserToken(usuario, request, response);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Erro ao fazer login" });
  }
};

export const logout = async (request, response) => {
  response.status(200).json({ message: "Logout realizado com sucesso." });
};

export const userInfo = async (request, response) => {
  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);
    const usuarioId = usuario.id;

    const like = await Curtida.findAndCountAll({
      raw: true,
      where: { usuario_id: usuarioId, tipo_avaliacao: "up" },
    });

    const deslike = await Curtida.findAndCountAll({
      raw: true,
      where: { usuario_id: usuarioId, tipo_avaliacao: "down" },
    });

    const publicacoesCurtidas = await conn.query(
      `
      SELECT publicacoes.id, curtidas.tipo_avaliacao
      FROM curtidas
      INNER JOIN publicacoes ON curtidas.publicacao_id = publicacoes.id
      WHERE curtidas.usuario_id = :usuarioId
    `,
      {
        replacements: { usuarioId },
        type: conn.QueryTypes.SELECT,
      }
    );

    //montar o objeto para enviar para o front
    usuario.totalLikes = like.count;
    usuario.totalDeslikes = deslike.count;
    usuario.interacoes = publicacoesCurtidas;

    response.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
