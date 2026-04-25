import { sequelize } from "../db-instance.js";

await sequelize.sync().catch(console.error);

export { sequelize, UserInterests } from "../db-instance.js";
