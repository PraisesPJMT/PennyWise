import { AppThemeProvider } from './theme/theme';
import Splash from './pages/splash/Splash';
import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <AppThemeProvider>
      <div id="app">
        <Splash />
      </div>
    </AppThemeProvider>
  );
};

export default App;
