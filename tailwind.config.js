module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif', 'system-ui'],
      'mono': ['"JetBrains Mono"', 'ui-monospace']
    },
    fontWeight: {
      thin: 400,
      normal: 500,
      bold: 700,
    },
    fontSize: {
      'display': '4.5rem',
      '5xl': '3.5rem',
      '4xl': '2.75rem',
      '3xl': '2.5rem',
      '2xl': '2.0rem',
      'xl': '1.5rem',
      'lg': '1.25rem',
      'base': '1rem',
      'sm': '0.875rem',
      'xs': '0.625rem',
      'xxs': '0.5rem',
    },
    lineHeight: {
      8: '91px',
      7: '64px',
      6: '52px',
      5: '48px',
      4: '40px',
      3: '32px',
      2: '24px',
      1: '16px',
    },
    colors: {
      white: '#fff',
      lightGreen: {
        100: '#ECF6E3',
        75: '#F1F8EA',
        50: '#F5FAF1',
        25: '#FAFDF8',
      },
      lime: {
        100: '#B4DD62',
        75: '#C7E589',
        50: '#D9EEB0',
        25: '#ECF6D8',
      },
      avocado: {
        100: '#6F9421',
        75: '#93AF58',
        50: '#B7C990',
        25: '#DBE4C7',
      },
      chili: {
        100: '#253209',
        75: '#5B6546',
        50: '#929884',
        25: '#C8CCC1',
      },
      navy: {
        100: '#0B1E33',
        75: '#485666',
        50: '#858E99',
        25: '#C2C7CC',
      },
      dashboardGray: {
        100: '#36424C',
        75: '#687179',
        50: '#9AA0A5',
        25: '#CDD0D2',
      },
      red: {
        100: '#FB544C',
        75: '#FC7F79',
        50: '#FDA9A5',
        25: '#FED4D2',
      },
      gray: {
        1: '#FAFCFA',
        2: '#D8DDD8',
        3: '#C8CDC8',
        4: '#B6BCB5',
        5: '#939892',
        6: '#6F766E',
        7: '#505950',
        8: '#32372B',
        9: '#1F2824',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
