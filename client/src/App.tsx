import { AppThemeProvider, useThemeContext } from './theme/theme';
import { Box, CssBaseline } from '@mui/material';
import './App.css';

const App: React.FC<{}> = () => {
  const { mode } = useThemeContext();

  return (
    <AppThemeProvider>
      <CssBaseline />
      <Box
        style={{
          height: '100vh',
        }}
      >
        <h1>PennyWize Mode: {mode}</h1>
        <br />
      </Box>
    </AppThemeProvider>
  );
};

export default App;
