import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Correct for Next.js pages
    './components/**/*.{js,ts,jsx,tsx,mdx}', // If components aren't in src
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Include everything in src if needed
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
