import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.acervo.home.android',
  appName: 'app-acervo',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.18.126:3000',
    cleartext: true
  }
};

export default config;
