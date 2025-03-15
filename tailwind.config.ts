import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#230524',
        secondary: '#062002',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'background-1': 'var(--background-1)',
        'hover-1': 'var(--hover-1)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        'text-4': 'var(--text-4)',
        'text-5': 'var(--text-5)',
        'button-linear-1': 'var(--button-linear-1)',
        'button-linear-2': 'var(--button-linear-2)',
        'red-signal': 'var(--red-signal)',
        'background-red-signal': 'var(--background-red-signal)',
        'green-signal': 'var(--green-signal)',
        'background-green-signal': 'var(--background-green-signal)',
        'secondary-1': 'var(--secondary-1)',
      },
      borderRadius: {
        'custom-1': '20px',
      },
    },
  },
  plugins: [],
};
export default config;
