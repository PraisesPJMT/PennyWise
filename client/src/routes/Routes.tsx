import { Outlet, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Groups from '../pages/groups/Groups';
import CreateGroup from '../pages/group-create/CreateGroup';
import Overview from '../pages/overview/Overview';
import GroupDetails from '../pages/group/GroupDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: 'groups',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Groups />,
              },
              {
                path: 'new',
                element: <CreateGroup />,
              },
              {
                path: ':groupId',
                element: <GroupDetails />,
              },
            ],
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);
