import { Sequelize } from "sequelize";

const conn = new Sequelize({
  dialect: "sqlite",
  storage: "./dev.sqlite",
});

export default conn;
