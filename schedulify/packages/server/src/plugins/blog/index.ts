
import { Express } from 'express';
import { Plugin } from '../plugin.interface';

class BlogPlugin implements Plugin {
  name = 'Blog Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const blogPlugin = new BlogPlugin();

export default blogPlugin;
