class CacheControl {
  constructor(server) {
      this.server = server;
  }

  enableCache = () => {
      this.setCacheHeaders();
  }

  getCacheRoutes = () => ([])

  getCacheTime = () => 7200 // two hours in seconds

  setCacheHeaders = () => {
    this.server.use((req, res, next) => {
      res.once('header', () => {
        let isCacheRoute = false;
        this.getCacheRoutes().forEach((route) => {
            if (new RegExp(route).test(req.url)) {
                isCacheRoute = true;
            }
        });
        if (isCacheRoute) {
            res.setHeader('Cache-Control', `public, max-age=${this.getCacheTime()}`);
        }
      });
      next();
    });
  }
}

export default CacheControl;