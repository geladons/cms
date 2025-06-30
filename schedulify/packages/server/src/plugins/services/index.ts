
import { Express } from 'express';
import { Plugin } from '../plugin.interface';

class ServicesPlugin implements Plugin {
  name = 'Services Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const servicesPlugin = new ServicesPlugin();

export default servicesPlugin;
