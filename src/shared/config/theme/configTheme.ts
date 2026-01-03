const config_theme = {
  typography: {
    fontFamily: ['gg sans', 'Roboto'].join(',')
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'text.primary'
        },
      }
    }
  },
    palette: {
      primary: {
        main: '#e8f9de'
      },
      text: {
        primary: '#f1d7e2',
        secondary: '#86888e'
      },
      background: {
        paper: '#2f312e',
        default: '#121214'
      }
    }
}

export {config_theme}
