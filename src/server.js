import express from 'express';
import morganLogger from './middlewares/loggerMiddleware.js';
import fs from "fs";
import chokidar from 'chokidar'
import open from 'open';
import { Server } from "socket.io";
import http from "http";

import { slashRout } from './controllers/routesController.js';
import logger from './config/logger-config.js';
import parse from '../lib/parser.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger);

const expressServer = (html, onPORT, isDebugMod, filePath) => {

    const PORT = onPORT || 2577;

    logger.level = isDebugMod ? 'debug' : 'warn';
    app.get('/', slashRout(html));

    server.listen(PORT, () => {
        logger.debug(`Running at http://127.0.0.1:${PORT}`);

        open(`http://127.0.0.1:${PORT}`);
    });

    io.on('connection', () => {
        chokidar.watch(filePath).on('change', () => {
            const morganCode = fs.readFileSync(filePath, "utf8");
            const html = parse(morganCode);
            io.emit("fileUpdated", html);
        })
    })
}


export default expressServer;