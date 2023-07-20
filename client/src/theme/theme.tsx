import {
  createContext,
  useContext,
  useCallback,
  ReactNode,
  FC,
  useState,
  useEffect,
} from 'react';

interface AppThemeProviderProps {
  children: ReactNode;
}

type ModeType = 'light' | 'dark';

export type ThemeContextType = {
  mode: ModeType;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);



export const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ModeType>('dark');

  const toggleMode = useCallback(() => {
    setMode((prev: ModeType) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      setMode(storedMode);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
