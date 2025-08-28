import express, { Request, Response } from 'express';
import sync from './config/mode.sync';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import HandleLogger from './middlewares/handleLogger';
import router from './routes';
import { HandleError } from './middlewares/handleError';

sync().then(() => {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(
    cors({
      origin: 'http://localhost:8080', // Reemplaza con tu URL de frontend
      credentials: true, // Permitir envío de cookies y autenticación HTTP
      methods: 'GET,POST,PUT,DELETE,PATCH', // Métodos permitidos
      allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(HandleLogger);
  app.use(router);
  app.use(HandleError);

  app.listen(port, () => {
    console.log('Server is runing on port: ', port);
  });
});
