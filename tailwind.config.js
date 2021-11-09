module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: (theme) => ({
      // To center containers by default
      center: true,

      // To add horizontal padding by default
      padding: {
        default: theme("spacing.4"),
        sm: theme("spacing.5"),
        xl: theme("spacing.12"),
        '2xl': theme("spacing.24"),
      }
    }),
    extend: {
      fontFamily: {
        'condensed': [
          '"Barlow Condensed"',
          'ui-sans-serif',
          'system-ui',
        ],
        'sans-serif': [
          'Barlow',
          'ui-sans-serif',
          'system-ui',
        ],
        'serif': [
          'Lora',
          'ui-serif',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ]
      },
      colors: {
        softblue: {
          light: '#297ab7',
          DEFAULT: '#297ab7',
          dark: '#297ab7',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
