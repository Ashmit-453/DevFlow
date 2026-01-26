"use client"
import {ThemeProvider as NextThemeProvider} from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemeProvider>
const ThemeProvider = ({children,...props}: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};
export default ThemeProvider;