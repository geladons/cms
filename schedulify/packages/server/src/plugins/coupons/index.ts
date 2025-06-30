
import { Express } from 'express';
import { Plugin } from '../plugin.interface';

class CouponsPlugin implements Plugin {
  name = 'Coupons Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const couponsPlugin = new CouponsPlugin();

export default couponsPlugin;
