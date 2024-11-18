'use client';

import localFont from 'next/font/local';
import { ThemeProvider } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyles';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? darkTheme : lightTheme);
    const handler = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? darkTheme : lightTheme);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
