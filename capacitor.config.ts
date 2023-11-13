import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.acervo.android',
  appName: 'app-acervo',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.200',
    cleartext: true
  }
};

export default config;
