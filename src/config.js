import fs from 'fs';
import _ from 'underscore';
import { config } from 'dotenv';

let instance = null;
/* eslint global-require: "off" */
class Config {
  constructor() {
    if (!instance) {
        this.configs = {};
        instance = this;
        this.setConfigurations(`${__dirname}/../config`);
    }
    return instance;
  }

  setConfigurations = (dirname) => {
      config();
      const files = fs.readdirSync(dirname);
      files.forEach((file) => {
          const filepath = `${dirname}/${file}`;
          if (fs.statSync(filepath).isDirectory()) {
              this.setConfigurations(filepath);
          } else {
              /* eslint global-require: "off", import/no-dynamic-require: off */
              const data = require(filepath);
              this.configs = _.extend(this.configs, data);
          }
      });
      return this;
  }
  
  get = (key, country = null) => {
      let data;
      if (this.configs[key]) {
          if (country && this.configs[key][country]) {
              if (this.configs[key].default) {
                  data = _.defaults(this.configs[key][country], this.configs[key].default);
              } else {
                  data = this.configs[key][country];
              }
          } else {
              data = this.configs[key].default;
          }
          return data;
      }
      return null;
  }
}

export default Config;
