import Controller from '../controller'; // eslint-disable-line

class Healthcheck extends Controller {
    constructor(server) {
        super(__dirname);
        this.authType = 'none';
        this.route(server);
    }

    get = (req, res) => {
        res.send(200);
    }
}

module.exports.route = function (server) {
    new Healthcheck(server);
};