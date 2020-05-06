import restify from 'restify';
import Config from './config'; // eslint-disable-line
import Logger from './logger'; // eslint-disable-line
import Router from './route'; // eslint-disable-line
import CacheControl from "./cacheControl"; // eslint-disable-line

class Server {
  constructor() {
      this.config = new Config();
      this.logger = (new Logger()).getLogger();
      this.createServer();
  }

  createServer = () => {
    this.server = restify.createServer({
        name: 'CMarvel API',
        version: '1.0.0',
        log: this.logger,
    });
    this.initializeServer();
    this.useMiddlewares();
    this.addRoutes();
    this.startListening();
  }

  initializeServer = () => {
    this.server
      .use(restify.plugins.fullResponse())
      .use(restify.plugins.queryParser())
      .use(restify.plugins.bodyParser())
      .use(restify.plugins.gzipResponse());
  }

  useMiddlewares = () => {
    new CacheControl(this.server).enableCache();
  }

  addRoutes = () => {
    new Router(`${__dirname}/controllers`, this.server);
  }

  startListening = () => {
    const port = this.config.get('server_port');
    this.server.listen(port, (err) => {
        if (err) {
            this.logger.error('Problem Starting Server', err);
        } else {
            this.logger.info(`App is ready at ${port}`);
        }
    });
    this.server.on('uncaughtException', (err) => {
        this.logger.error('Uncaught Exception ', err);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, p) => {
        this.logger.error(reason, p);
    });
  }
}

export default Server;

