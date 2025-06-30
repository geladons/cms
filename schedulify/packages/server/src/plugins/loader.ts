
import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import { Plugin } from './plugin.interface';

export const loadPlugins = (app: Express) => {
  const pluginsDir = path.join(__dirname);
  const pluginFolders = fs.readdirSync(pluginsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of pluginFolders) {
    const pluginPath = path.join(pluginsDir, folder, 'index.ts');
    if (fs.existsSync(pluginPath)) {
      const pluginModule = require(pluginPath);
      const plugin: Plugin = pluginModule.default;
      if (plugin && typeof plugin.init === 'function') {
        plugin.init(app);
        console.log(`Plugin loaded: ${plugin.name} v${plugin.version}`);
      }
    }
  }
};
