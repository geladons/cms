
import { Express } from 'express';
import { Plugin } from '../plugin.interface';
import invoiceService from './invoice.service';

class InvoicingPlugin implements Plugin {
  name = 'Invoicing Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const invoicingPlugin = new InvoicingPlugin();

export { invoiceService };
export default invoicingPlugin;
