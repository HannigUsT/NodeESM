import app from './modules/config/app.js';
import env from './modules/config/env.js';

app.listen(env.port, () => {
  console.log(`Server running on localhost:${env.port}`);
});
