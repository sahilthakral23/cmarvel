import fs from 'fs';

class Router {
    constructor(dirname, server) {
        this.route(dirname, server);
    }

    route = (dirname, server) => {
        const files = fs.readdirSync(dirname);
        const obj = this;
        files.forEach((file) => {
            const filepath = `${dirname}/${file}`;
            if (fs.statSync(filepath).isDirectory()) {
                obj.route(filepath, server);
            } else {
                /* eslint global-require: "off", import/no-dynamic-require: off */
                const controller = require(filepath);
                controller.route(server);
            }
        });
    }
}

export default Router;
