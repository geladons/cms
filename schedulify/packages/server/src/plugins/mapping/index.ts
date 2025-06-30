
import { Express } from 'express';
import { Plugin } from '../plugin.interface';
import geocodingService from './geocoding.service';

class MappingPlugin implements Plugin {
  name = 'Mapping Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const mappingPlugin = new MappingPlugin();

export { geocodingService };
export default mappingPlugin;
