import { DataTypes } from "sequelize";
import conn from "../config/conn.js"

const Empresa = conn.define("empresa", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Empresa