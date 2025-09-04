import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DBNAME ?? 'heliconia',
  process.env.DBUSER ?? 'heliconia_user',
  process.env.DBPASSWORD ?? '1234',
  {
    host: process.env.DBHOST ? process.env.DBHOST : 'localhost',
    port: Number(process.env.DBPORT) ?? 5432,
    dialect: 'postgres',
    logging: false,
  }
);

console.log('Stating connection with database: ', process.env.DBNAME);

db.authenticate()
  .then(() => {
    console.log('✅ DB connection has been established succesfully');
  })
  .catch((error) => {
    console.log('❌ Unable to connecto to DB: ', error);
  });

export default db;
