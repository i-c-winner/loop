const config_theme = {
  typography: {
    fontFamily: ['gg sans', 'Roboto'].join(',')
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
        },
      }
    }
  },
    palette: {
      primary: {
        main: '#0b0bef',
      },
      secondary: {
        main: '#242428'
      },
      text: {
        primary: '#171616',
        secondary: '#19191c',
      },
      background: {
        paper: '#ffffff',
        default: '#eaf3ff'
      }
    }
}

export {config_theme}
