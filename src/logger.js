import bunyan from 'bunyan';
import { config } from 'dotenv';

let logger;
let instance;

class Logger {
  constructor() {
    if (!instance) {
        instance = this;
    }
    return instance;
  }

  getLogger = () => {
    if (!logger) {
      config();
      logger = bunyan.createLogger({
        name: 'logger',
        src: true,
        streams: [
          {
              stream: process.stdout,
              level: process.env.LOGGINGLEVEL || 'error',
              src: true,
          },
        ],
        serializers: bunyan.stdSerializers,
      });
    }
    return logger;
  }

  error = (msg, data) => {
    let text = msg;
    if (!text) {
        text = 'something went wrong';
    }
    this.getLogger().error(text, data);
  }

  info = (msg, data = '') => {
    let text = msg;
    if (!text) {
        text = 'something happend';
    }
    this.getLogger().info(text, data);
  }
}

export default Logger;
