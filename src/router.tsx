import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './App';
import { Overview } from './components/Overview';
import { BlockDetail } from './components/BlockDetail';
import { Editor } from './pages/Editor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'block/:id', element: <BlockDetail /> },
      { path: 'editor/new', element: <Editor /> },
    ],
  },
]);
