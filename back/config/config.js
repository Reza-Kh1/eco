import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost', // Your PostgreSQL host
    port: 5432,        // Your PostgreSQL port
    username: 'postgres',
    password: 'admin',
    database: 'Eco_new',
    logging: false,
});



const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default sequelize;

export { connectDb, sequelize};




