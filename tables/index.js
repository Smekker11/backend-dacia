import { sequelize } from "../db-instance.js";

await sequelize.sync().catch(console.error);

export { sequelize, Locations, Risks };
