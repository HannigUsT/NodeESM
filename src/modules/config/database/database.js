import knex from 'knex';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'V0.0.1.db')
  },
  useNullAsDefault: true
});
