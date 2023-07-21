import { Outlet } from 'react-router-dom';
import { AppThemeProvider } from './theme/theme';
// import Splash from './pages/splash/Splash';
import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <AppThemeProvider>
      <div id="app">
        <Outlet />
      </div>
    </AppThemeProvider>
  );
};

export default App;
