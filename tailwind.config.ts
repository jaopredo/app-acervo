import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        leaf: {
            lighter: '#E6F4F1',
            light: '#96D2C6',
            DEFAULT: '#279D85',
            dark: '#21937A',
            darker: '#1B8A70'
        },
        night: {
            lighter: '#E2E5E8',
            light: '#273B54',
            DEFAULT: '#091F3C',
            dark: '#071A34',
            darker: '#05152b',
        }
      }
    },
  },
  plugins: [],
}
export default config
