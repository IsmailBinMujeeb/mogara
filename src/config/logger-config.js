import { createLogger, format, transports } from "winston";
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

export default logger;