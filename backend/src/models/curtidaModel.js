import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import Usuario from "./usuarioModel.js";
import Publicacao from "./publicacaoModel.js"; 

const Curtida = conn.define("curtidas", {
    tipo_valiacao: {
        type: DataTypes.ENUM(["up", "down"])
    }, 
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    publicacao_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Publicacao,
            key: "id"
        },
        onDelete: "CASCADE"
    }
})

Usuario.belongsToMany(Publicacao, {
    through: Curtida, 
    foreignKey: "usuario_id", 
    otherKey: "publicacao_id"
})
Publicacao.belongsToMany(Usuario, {
    through: Curtida, 
    foreignKey: "publicacao_id", 
    otherKey: "usuario_id"
})

export default Curtida