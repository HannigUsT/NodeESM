import { readdir } from 'fs/promises';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const setupRoutes = async (app, baseRoute) => {
  try {
    const router = express.Router();
    app.use(baseRoute, router);

    const files = await readdir(join(__dirname, '../routes'));
    for (const fileName of files) {
      if (fileName.endsWith('.js')) {
        const route = await import(`../routes/${fileName}`);
        route.default(router);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
