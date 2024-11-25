import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import Publicacao from "./publicacaoModel.js";
import Usuario from "./usuarioModel.js";

const Curtida = conn.define("curtidas", {
  tipo_avaliacao: {
    type: DataTypes.ENUM(["up", "down"]),
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Publicacao,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
});

Usuario.belongsToMany(Publicacao, {
  through: Curtida,
  foreignKey: "usuario_id",
  otherKey: "publicacao_id",
});

Publicacao.belongsToMany(Usuario, {
  through: Curtida,
  foreignKey: "publicacao_id",
  otherKey: "usuario_id",
});

export default Curtida;
