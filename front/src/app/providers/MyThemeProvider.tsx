'use client'
import {ThemeProvider} from '@mui/material/styles'
import {theme} from "@/shared/lib/theme/creatingTheme";

type Props = {
  children: React.ReactNode
}
function MyThemeProvider({children}: Props) {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}

export {MyThemeProvider}
