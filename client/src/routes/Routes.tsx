import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Splash from '../pages/splash/Splash';
import Login from '../pages/login/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Splash />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
