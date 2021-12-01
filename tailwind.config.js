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
        DEFAULT: theme("spacing.4"),
        sm: theme("spacing.5"),
        xl: theme("spacing.12"),
        '2xl': theme("spacing.24"),
      }
    }),
    flexGrow: {
      '0': 0,
      DEFAULT: 1,
      '1': 1,
      '2': 2,
    },
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
      height: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
