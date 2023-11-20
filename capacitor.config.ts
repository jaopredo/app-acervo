import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.acervo.home.android',
  appName: 'acervo-app',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.200:3000',
    cleartext: true
  }
};

export default config;
