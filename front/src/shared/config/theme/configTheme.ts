const config_theme = {
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: ['gg sans', 'Inter', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
    h1: { fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, lineHeight: 1.1 },
    h2: { fontSize: 'clamp(1.6rem, 2.2vw, 2.25rem)', fontWeight: 700, lineHeight: 1.15 },
    h3: { fontSize: 'clamp(1.35rem, 1.8vw, 1.8rem)', fontWeight: 700, lineHeight: 1.2 },
    h4: { fontWeight: 700, lineHeight: 1.2 },
    h5: { fontWeight: 700, lineHeight: 1.25 },
    h6: { fontWeight: 700, lineHeight: 1.25 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.55 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#0F6FFF',
      dark: '#0B57CC',
      light: '#5EA0FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0E1726',
    },
    success: {
      main: '#0EA76A',
    },
    warning: {
      main: '#EAA300',
    },
    error: {
      main: '#DC3B4B',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
    background: {
      default: '#F4F8FF',
      paper: '#FFFFFF',
    },
    divider: '#D9E4F6',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle at 10% -10%, rgba(15,111,255,0.2), transparent 35%), radial-gradient(circle at 90% 0%, rgba(14,167,106,0.12), transparent 38%), #F4F8FF',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid #DDE7FA',
          boxShadow: '0 10px 30px rgba(16, 24, 40, 0.06)',
          backdropFilter: 'blur(6px)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 16,
          minHeight: 40,
          boxShadow: 'none',
        },
        containedPrimary: {
          boxShadow: '0 8px 20px rgba(15,111,255,0.25)',
        },
        outlined: {
          borderWidth: 1.5,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 99,
        },
      },
    },
  },
};

export { config_theme };
