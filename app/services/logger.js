const winston = require("winston");
const db = require("../models");
require("winston-mongodb");

const logger = winston.createLogger({
   level: "error",
   format: winston.format.json(),
   message: "Hey! Log something?",
   transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.MongoDB({
         filename: "error",
         options: { useUnifiedTopology: true },
         level: "error",
         db: db.url,
         format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
         ),
      }),

      new winston.transports.File({
         filename: "error.log",
         level: "error",
         format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
         ),
      }),

      //new winston.transports.Console(),
   ],
});

module.exports = logger;
