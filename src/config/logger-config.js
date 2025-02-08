/*eslint no-undef: "off"*/
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, json, colorize } = format;

const logFormate = format.combine(
    format.colorize(),
    format.printf(({ level, message }) => {
        return `${level}: ${message}`;
    })
);

const logger = createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new transports.Console({
            format: logFormate,
        }),
        new transports.File({ filename: '../app.log' })
    ]
});

module.exports = logger;