
import { Express, Request, Response } from 'express';
import { Plugin } from '../plugin.interface';

class HelloWorldPlugin implements Plugin {
  name = 'Hello World Plugin';
  version = '1.0.0';

  init(app: Express) {
    app.get('/api/hello', (req: Request, res: Response) => {
      res.send('Hello from plugin!');
    });
  }
}

export default new HelloWorldPlugin();
