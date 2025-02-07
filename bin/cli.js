#!/usr/bin/env node

import { Command } from "commander";
import { createRequire } from 'module';
import logger from "../src/config/logger-config.js";
import parse from "../lib/parser.js";
import fs from 'fs';
import path from 'path';

/* eslint-disable no-undef */
const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

const program = new Command();

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display Mogra version')
    .argument('<file>', 'Path to the file')
    .option('--port <port>', 'run the server on this port', 2577)
    .option('--debug', 'enable debug mode', false)
    .action((file, options) => {
        const filePath = path.resolve(file);

        if (!fs.existsSync(filePath)) {
            logger.error(`File "${filePath}" not found!`);
            process.exit(1);
        }

        const morganCode = fs.readFileSync(filePath, 'utf-8');
        parse(morganCode, options.port, options.debug);
    })


program.parse(process.argv);
/* eslint-enable no-undef */