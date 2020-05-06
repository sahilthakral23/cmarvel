import errs from 'restify-errors';
import Config from './config'; // eslint-disable-line
import Logger from './logger'; // eslint-disable-line

/*
Base Controller for version based route function
 - Automatically detects version based on folder structure (v1 => '1.0.0')
 - Detects type of request from function name in the class.
   ( function putA() in class A will end-up assigning the function for calls to path '[path to A
         after controllers dir]/A' for put type requests,
   if you have function putSomething in class A will end-up assigning the function for calls to path
   '[path to A after controllers dir]/A/Something' for put type requests
 */
class Controller {
    constructor(controllerDir) {
        this.routePath = controllerDir.split('/controllers')[1];
        this.authType = 'none';
        this.config = new Config();
        this.logger = (new Logger()).getLogger();
    }

    route = (server) => {
      Object.keys(this).forEach((key) => {
        ['get', 'post', 'put', 'del'].forEach((type) => {
          if (key.startsWith(type)) {
            let path = `${this.routePath}/${this.constructor.name.toLowerCase()}`;
            if (key.toLowerCase() !== type && this.constructor.name.toLowerCase()) {
                path = path.concat(`/${key.replace(type, '').toLowerCase()}`);
            }
            server[type]({ path, }, this[key]);
          }
        });
      });
    }
}

export default Controller;