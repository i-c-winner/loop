const config_theme = {
  typography: {
    fontFamily: ['gg sans', 'Roboto'].join(',')
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 10,
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
        },
      }
    }
  },
    palette: {
      primary: {
        main: '#1d4ed8',
        contrastText: 'black'
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
        default: '#f9fbfc',
        shadow: 'red'
      }
    }
}

export {config_theme}
