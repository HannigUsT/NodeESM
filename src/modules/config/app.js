import express from 'express';
import cors from 'cors';
import { setupRoutes } from './routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app, '/api');

export default app;
