import { readFileSync } from 'fs';

export const GlobalConfig = {
  appVersion: JSON.parse(readFileSync('package.json', 'utf8')).version,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRED,
  },
};
