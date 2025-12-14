"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export default function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
