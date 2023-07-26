import { Outlet } from 'react-router-dom';
import { AppThemeProvider } from './theme/theme';
import NoticeModal from './components/notice/Notice';

import './App.scss';

const App: React.FC<{}> = () => {
  return (
    <AppThemeProvider>
      <div id="app">
        <Outlet />
        <NoticeModal />
      </div>
    </AppThemeProvider>
  );
};

export default App;
