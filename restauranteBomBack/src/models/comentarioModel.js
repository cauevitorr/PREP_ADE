import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import Publicacao from "./publicacaoModel.js";
import Usuario from "./usuarioModel.js";

const Comentario = conn.define("comentarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
  },
  comentario: {
    type: DataTypes.STRING,
    validate: {
      min: 3,
    },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: Usuario,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
  publicacao_id: {
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: Publicacao,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
});

// Usuario.belongsToMany(Publicacao, {
//   through: Comentario,
//   foreignKey: "usuario_id",
//   otherKey: "publicacao_id",
// });

// Publicacao.belongsToMany(Usuario, {
//   through: Comentario,
//   foreignKey: "publicacao_id",
//   otherKey: "usuario_id",
// });

Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });
Comentario.belongsTo(Publicacao, { foreignKey: "publicacao_id" });

export default Comentario;
