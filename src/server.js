import express from 'express';
import morganLogger from './middlewares/loggerMiddleware.js';

import { slashRout } from './controllers/routesController.js';
import logger from './config/logger-config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger);

const server = (html, onPORT, isDebugMod) => {

    const PORT = onPORT || 2577;

    logger.level = isDebugMod ? 'debug' : 'warn';
    app.get('/', slashRout(html));
    app.listen(PORT, ()=>{
        logger.debug(`Running at http://127.0.0.1:${PORT}`);
    });
}

export default server;