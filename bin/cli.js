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
    .action(file => {
        const filePath = path.resolve(file);

        if (!fs.existsSync(filePath)) {
            logger.error(`File "${filePath}" not found!`);
            process.exit(1);
        }

        const morganCode = fs.readFileSync(filePath, 'utf-8');
        parse(morganCode);
    })


program.parse(process.argv);
/* eslint-enable no-undef */