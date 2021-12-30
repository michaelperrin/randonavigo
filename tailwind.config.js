module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
      boxShadow: {
        'card': '0px 0px 18px rgb(83 70 29 / 15%)',
      },
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
        'rer-b': '#5291ce',
        'rer-c': '#ffce00',
        'rer-d': '#00814f',
        'rer-e': '#c04191',
        'tram-t2': '#c04191',
        'tram-t11': '#f28e42',
        'transilien-h': '#8d5e2a',
        'transilien-j': '#d5c900',
        'transilien-l': '#ceadd2',
        'transilien-n': '#00a88f',
        'transilien-p': '#f28e42',
        'transilien-r': '#f3a4ba',
        'transilien-u': '#b90845',
      },
      height: theme => ({
        "hero-header": "60vh",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
