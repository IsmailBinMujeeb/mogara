import logger from "../config/logger-config.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const morganLogger = morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logStr = `${message.split(" ")[0]} ${message.split(" ")[1]} ${ message.split(" ")[2]} ${ message.split(" ")[3]} -ms`
            logger.info(logStr);
        },
    },
})

export default morganLogger;