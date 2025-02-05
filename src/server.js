import express from 'express';
import morganLogger from './middlewares/loggerMiddleware.js';

import { slashRout } from './controllers/routesController.js';

const app = express();
const PORT = 2577;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger);

const server = (html) => {
    app.get('/', slashRout(html));
    app.listen(PORT);
}

export default server;