import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import APIError from './utils/ApiError';
import client from './database/connection';

export default class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.testConnection();
  }

  private async testConnection() {
    try {
      await client.connect();
      const result = await client.query('SELECT 1+1 as result');
      console.log(result.rows);
      await client.end()
    } catch (error) {
      console.log(error);
    }
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors({
      origin: '*',
      allowedHeaders: '*',
      methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS'
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
  }

  private routes() {
    this.app.get('/check', (_req, res) => res.send('API is running'))

    this.app.use((err: APIError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.log(err);
      if (err && err.statusCode) {
        const { statusCode, message } = err;
        return res.status(statusCode).json({ message });
      }
      return res.status(500).json({ message: err.message });
    });
  }

  public start(port: number | string) {
    this.app.listen(port, () => console.log('App is running on port ' + port));
  }
}