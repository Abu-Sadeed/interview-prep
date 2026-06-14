import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './App';
import { Overview } from './components/overview/Overview';
import { BlockDetail } from './components/block/BlockDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'block/:id', element: <BlockDetail /> },
    ],
  },
]);
