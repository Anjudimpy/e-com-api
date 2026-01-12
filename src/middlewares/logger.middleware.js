import fs from 'fs';
//1. using library
import winston from 'winston';

// const fsPromise = fs.promises;

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} -${logData}`;
//         fsPromise.appendFile('log.txt', logData);
//     } catch (err) {
//         console.log(err);
//     }
// }

//2. using winston library  
const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});

const loggerMiddleware = async (req, res, next) => {
    //1. Log request body.
    if(!req.url.includes('signin')){
     const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    //  await log(logData);
//3. by winston lib
logger.info(logData); }
   next();
}

export default loggerMiddleware;