'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { MyThemeProvider } from '@/app/providers/MyThemeProvider';

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <MyThemeProvider>
        <CssBaseline />
        {children}
      </MyThemeProvider>
    </AppRouterCacheProvider>
  );
}

