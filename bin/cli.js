#!/usr/bin/env node

/* eslint-disable no-undef */
const { Command } = require("commander");
const logger = require("../src/config/logger-config.js");
const parse = require("../lib/parser.js");
const server = require("../src/server.js");
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

const program = new Command();

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display Mogra version')
    .argument('<file>', 'Path to the file')
    .option('--port <port>', 'run the server on this port', 2577)
    .option('--debug', 'enable debug mode', false)
    .option('--expose', 'Convert the .mg code to .html', false)
    .action((file, options) => {
        const filePath = path.resolve(file);

        if (!fs.existsSync(filePath)) {
            logger.error(`File "${filePath}" not found!`);
            process.exit(1);
        }

        const mogaraCode = fs.readFileSync(filePath, 'utf-8');
        const html = parse(mogaraCode);
        
        if (!options.expose) server(html, options.port, options.debug, filePath);
        else {
            const pathToHtml = filePath.replace('.mg', '.html');
            
            fs.writeFile(pathToHtml, html, (err)=>{
                if (err) logger.error(err.message);
            })
        }
    })


program.parse(process.argv);
/* eslint-enable no-undef */