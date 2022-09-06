import { readFileSync } from 'fs';

export const GlobalConfig = {
  appVersion: JSON.parse(readFileSync('package.json', 'utf8')).version,
};
