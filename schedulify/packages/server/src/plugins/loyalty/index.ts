
import { Express } from 'express';
import { Plugin } from '../plugin.interface';
import loyaltyService from './loyalty.service';

class LoyaltyPlugin implements Plugin {
  name = 'Loyalty Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const loyaltyPlugin = new LoyaltyPlugin();

export { loyaltyService };
export default loyaltyPlugin;
