import { useState, FC, ReactNode, createContext, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

interface ThemeContext {
  mode: string;
  toggleMode?: () => void;
}

type AppThemeType = {
  children: ReactNode;
};

type DefaultModeType = {
  mode: 'light' | 'dark';
};

const defaultMode: DefaultModeType = {
  mode: 'light',
};

const ThemeContext = createContext<ThemeContext>(defaultMode);

const AppTheme: FC<AppThemeType> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(defaultMode.mode);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: green[500],
      },
      secondary: {
        main: purple[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          mode,
          toggleMode: toggleMode,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default AppTheme;
