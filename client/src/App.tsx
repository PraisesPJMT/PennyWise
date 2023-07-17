import AppTheme from './theme/theme';
import { Button, Box } from '@mui/material';
import './App.css';

const App: React.FC<{}> = () => {
  return (
    <AppTheme>
      <Box style={{ height: '100vh', background: '#555' }}>
        <h1>PennyWize</h1>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Box>
    </AppTheme>
  );
};

export default App;
