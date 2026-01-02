const config_theme = {
  typography: {
    fontFamily: ['gg sans', 'Roboto'].join(',')
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'text.primary'
        }
      }
    }
  },
    palette: {
      text: {
        primary: '#dededf',
        secondary: '#86888e'
      },
      background: {
        paper: '#202024',
        default: '#121214'
      }
    }
}

export {config_theme}
