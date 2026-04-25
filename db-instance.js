import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
{
	dialect: "sqlite",
	storage: "./db/analytics.sqlite"
});

export const UserInterests = sequelize.define('Interests',
{
	id:
	{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	uniqueId:
	{
		type: DataTypes.STRING,
		allowNull: false
	},
	ip:
	{
		type: DataTypes.STRING
	},
	interests:
	{
		type: DataTypes.JSON,
		defaultValue: []
	},
},
{
	tableName: 'interests'
})

sequelize.sync().then(() =>
{
	console.log('Database & tables created!');
})
.catch((error) =>
{
	console.error('Error creating database:', error);
});
