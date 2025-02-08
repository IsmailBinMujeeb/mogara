/*eslint no-undef: "off"*/

const express = require('express');
const morganLogger = require('./middlewares/loggerMiddleware.js');
const fs = require("fs");
const chokidar = require('chokidar');
const opn = require('opn')
const { Server } = require("socket.io");
const http = require("http");

const { slashRout } = require('./controllers/routesController.js');
const logger = require('./config/logger-config.js');
const parse = require('../lib/parser.js');

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

    server.listen(PORT, async () => {
        logger.debug(`Running at http://127.0.0.1:${PORT}`);

        opn(`http://127.0.0.1:${PORT}`);
    });

    io.on('connection', () => {
        chokidar.watch(filePath).on('change', () => {
            const morganCode = fs.readFileSync(filePath, "utf8");
            const html = parse(morganCode);
            io.emit("fileUpdated", html);
        })
    })
}


module.exports = expressServer;