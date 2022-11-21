import morgan from 'morgan';
import winstonLogger from './logs.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
dotenv.config();
const loggerStream = {
    write: (message) => winstonLogger.http(message.substring(0, message.lastIndexOf('\n')))
};
const morganMiddleware = morgan(chalk.yellow(':method :url :status :res[content-length]- :response-time ms - API Server'), { stream: loggerStream, skip: () => process.env.NODE_ENV === 'development' });
export default morganMiddleware;
//# sourceMappingURL=morganMiddleware.js.map