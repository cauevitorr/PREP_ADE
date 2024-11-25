import Comentario from "../models/comentarioModel.js";

import getToken from "../helper/get-token.js";
import getUserByToken from "../helper/get-user-by-token.js";

export const criarComentario = async (request, response) => {
  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);
    const usuarioId = usuario.id;

    const { publicacao_id, comentario } = request.body;

    if (!comentario) {
      response.status(400).json({ message: "O comentário é obrigatório" });
      return;
    }

    if (comentario.length < 3) {
      response
        .status(401)
        .json({ message: "O comentário deve conter no mínimo 3 caracteres" });
      return;
    }

    const novoComentario = {
      usuario_id: usuarioId,
      publicacao_id: parseInt(publicacao_id),
      comentario,
    };

    console.log(novoComentario);
    await Comentario.create(novoComentario);

    response.status(201).json({ message: "Comentário cadastrado" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ err: "Erro em adicionar comentário" });
  }
};

export const editarComentario = async (request, response) => {
  const { id } = request.params;
  const { comentario } = request.body;

  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);

    if (!comentario) {
      response.status(400).json({ message: "O comentário é obrigatório" });
      return;
    }
    if (comentario.length < 3) {
      response
        .status(401)
        .json({ message: "O comentário deve conter no mínimo 3 caracteres" });
      return;
    }

    const [numAffectedRows] = await Comentario.update(
      { comentario },
      { where: { id, usuario_id: usuario.id } }
    );

    if (numAffectedRows === 0) {
      response.status(404).json({
        message:
          "Comentário não encontrado ou você não tem permissão para editar este comentário.",
      });
      return;
    }

    response.status(200).json({ message: "Comentário atualizado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Erro ao atualizar comentário" });
  }
};

export const excluirComentario = async (request, response) => {
  const id = request.params.id;

  try {
    const token = getToken(request);
    const usuario = await getUserByToken(token);

    const excluirComentario = await Comentario.destroy({
      where: { id, usuario_id: usuario.id },
    });
    if (excluirComentario === 0) {
      response.status(404).json({
        message:
          "Comentário não encontrado ou você não tem permissão para excluí-lo.",
      });
      return;
    }
    response.status(200).json({ message: "Comentário excluído com sucesso." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ err: "Erro ao excluir comentário" });
  }
};
