/* eslint-disable no-console */
import winston, { format } from 'winston';

import Elasticsearch, { LogData } from 'winston-elasticsearch';

const { combine, timestamp, prettyPrint, errors, splat } = format;

const esTransportOpts = {
  index: process.env.LOG_INDEX,
  level: 'info',
  clientOpts: {
    host: process.env.LOG_ELASLICSEARCH_HOST,
    log: 'info',
    httpAuth: `${process.env.LOG_PASSWORD}`,
  },
  transformer: (log: LogData) => {
    console.log(log.message);
    return {
      '@timestamp': new Date().toISOString(),
      severity: log.level,
      message: `[${log.level}] - ${log.message}`,
      fields: {
        meta: log.meta,
      },
    };
  },
};

const logger = winston.createLogger({
  level: 'info',
  format: combine(errors({ stack: true }), timestamp(), prettyPrint(), splat()),
  transports: [
    new winston.transports.File({
      filename: `../src/datalog/${new Date().getTime()}.log`,
      level: 'info',
    }),
    new Elasticsearch(esTransportOpts),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
