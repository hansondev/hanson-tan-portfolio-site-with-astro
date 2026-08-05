import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,js,ts,jsx,tsx,css}', './components/**/*.{astro,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        code: ['Fira Mono', 'monospace'],
      },
      fontSize: {
        tagline: ['18px', '1.25'],
        headline: ['38px', '1.25'],
        h1: ['38px', '1.25'],
        h2: ['32px', '1.3'],
        h3: ['26px', '1.35'],
        description: ['16px', '1.571'],
        regular: ['16px', '1.571'],
        bold: ['16px', '1.25'],
        nav: ['16px', '1.571'],
        code: ['14px', '1.6'],
      },
      alignments: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      colors: {
        background: {
          DEFAULT: 'var(--background-color)',
          muted: 'var(--background-color-muted)',
          variant: 'var(--background-variant-color)',
        },
        foreground: 'var(--foreground-color)',
        surface: 'var(--surface-color)',
        border: 'var(--border-color)',
        muted: 'var(--muted-color)',
        primary: 'var(--accent-color-light)',
        input: 'var(--input-color)',
        secondary: 'var(--accent-color-dark)',
        accent: 'var(--accent-color)',
        soft: 'var(--accent-color-soft)',
        blue: {
          DEFAULT: '#1a365d',
        },
        gray: {
          DEFAULT: '#e8f1fb',
          muted: '#8ba3c7',
          dark: '#42566E',
        },
        midnight: '#112240',
        'navy-surface': '#1a365d',
        sky: '#7bb5e3',
        'light-text': '#e8f1fb',
        'muted-blue': '#8ba3c7',
        'navy-border': '#2d4a6f',
        steel: '#5a9bd5',
      },
      spacing: {
        '1': '0.5rem',
        '2': '1rem',
        '3': '1.5rem',
        '4': '2rem',
        '5': '2.5rem',
        '6': '3rem',
        '8': '4rem',
        '10': '5rem',
        '12': '6rem',
        '16': '8rem',
        '20': '10rem',
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground-color)',
            maxWidth: '72ch',
            lineHeight: '1.571',
            textAlign: 'left',
            a: {
              color: 'var(--accent-color)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: '2.375rem',
              fontWeight: '600',
              lineHeight: '1.25',
              marginTop: '2rem',
            },
            h2: {
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: '2rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '1.5rem',
            },
            h3: {
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: '1.625rem',
              fontWeight: '600',
              lineHeight: '1.35',
              marginTop: '1rem',
            },
            p: {
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: '1rem',
              fontWeight: '400',
              lineHeight: '1.75',
            },
            img: {
              borderRadius: '6px',
              margin: '1rem 0',
              maxWidth: '100%',
              height: 'auto',
            },
            iframe: {
              borderRadius: '6px',
              margin: '1rem 0',
            },
            code: {
              fontFamily: 'Fira Mono, monospace',
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '1.6',
              backgroundColor: 'var(--background-color-muted)',
              color: 'var(--foreground-color)',
              borderRadius: '4px',
              padding: '0.15rem 0.35rem',
              display: 'inline',
              '&::before': {
                content: 'none',
              },
              '&::after': {
                content: 'none',
              },
            },
            'p > code': {
              '&::before': {
                content: 'none',
              },
              '&::after': {
                content: 'none',
              },
            },
            pre: {
              fontFamily: 'Fira Mono, monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              backgroundColor: 'var(--background-color-muted)',
              color: 'var(--foreground-color)',
              borderRadius: '6px',
              padding: '1rem',
              overflowX: 'auto',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeft: '4px solid var(--accent-color)',
              paddingLeft: '1rem',
              textAlign: 'left',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.25rem',
              listStylePosition: 'inside',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.25rem',
              listStylePosition: 'inside',
            },
            li: {
              marginBottom: '0.5rem',
              '& p': {
                display: 'inline',
                margin: '0',
              },
            },
          },
        },
        dark: {
          css: {
            color: 'var(--foreground-color)',
            a: {
              color: 'var(--accent-color)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            blockquote: {
              borderLeftColor: 'var(--border-color)',
            },
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
  safelist: ['grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3'],
};

export default config;
