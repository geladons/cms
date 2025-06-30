
import { Express } from 'express';
import { Plugin } from '../plugin.interface';

class CrmPlugin implements Plugin {
  name = 'CRM Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const crmPlugin = new CrmPlugin();

export default crmPlugin;
