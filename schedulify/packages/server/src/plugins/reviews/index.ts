
import { Express } from 'express';
import { Plugin } from '../plugin.interface';

class ReviewsPlugin implements Plugin {
  name = 'Reviews Plugin';
  version = '1.0.0';

  init(app: Express) {
    console.log(`Plugin loaded: ${this.name} v${this.version}`);
  }
}

const reviewsPlugin = new ReviewsPlugin();

export default reviewsPlugin;
