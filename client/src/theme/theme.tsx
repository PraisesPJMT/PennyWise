import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  ReactNode,
  FC,
  useState,
} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { green, purple } from '@mui/material/colors';

export type ThemeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
};

export interface CustomTheme {
  palette: {
    mode: PaletteMode;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
  };
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleMode = useCallback(
    () => setMode((prev: PaletteMode) => (prev === 'dark' ? 'light' : 'dark')),
    []
  );

  const theme: CustomTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: purple[500],
          },
          secondary: {
            main: green[500],
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};
