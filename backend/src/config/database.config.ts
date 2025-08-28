import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DBNAME ? process.env.DBNAME : 'todo',
  process.env.DBUSER ? process.env.DBUSER : 'root',
  process.env.DBPASSWORD ? process.env.DBPASSWORD : '',
  {
    host: process.env.DBHOST ? process.env.DBHOST : 'localhost',
    port: process.env.DBPORT ? Number(process.env.DBPORT) : 3306,
    dialect: 'mysql',
    logging: false,
  }
);

console.log('Stating connection with database: ', process.env.DBNAME);

db.authenticate()
  .then(() => {
    console.log('DB connection has been established succesfully');
  })
  .catch((error) => {
    console.log('Unable to connecto to DB: ', error);
  });

export default db;
