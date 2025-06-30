
import { Express } from 'express';

export interface Plugin {
  name: string;
  version: string;
  init(app: Express): void;
}
