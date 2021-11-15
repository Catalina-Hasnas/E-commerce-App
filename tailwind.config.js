module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    //   backgroundImage: theme => ({
    //     'header': "url('./assets/images/background-with-coffee-beans.jpg')",
    //  }),

     height: theme => ({
      'large': '42rem',
      }),

      colors: theme => ({
        "primary": '#2b130a', 
        "secondary": '#c44c0a',
        "primaryLight": '#e9e2c3',
        "bg": '#f5f6f8'
      }),

      fontFamily: theme => ({
        'sans': ['Helvetica', 'ui-sans-serif', 'system-ui'],
      }),
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
