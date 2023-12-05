import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.acervo.sauto.android',
  appName: 'Aplicativo Multimeios (Sauto)',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.200:3000',
    cleartext: true
  }
};

export default config;
