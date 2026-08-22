import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        editorial: ['var(--font-playfair)', 'Georgia', 'serif']
      },
      fontSize: {
        'massive': ['clamp(4rem, 15vw, 12rem)', '0.85'],
        'giant': ['clamp(3rem, 8vw, 8rem)', '0.9'],
      },
      maxWidth: {
        content: '1440px'
      }
    }
  },
  plugins: []
};

export default config;
