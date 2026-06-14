import {createBrowserRouter} from 'react-router-dom';
import {Layout} from './App';
import {BlockDetail} from './components/block/BlockDetail';
import {Overview} from './components/overview/Overview';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{index: true, element: <Overview />},
				{path: 'block/:id', element: <BlockDetail />},
			],
		},
	],
	{
		basename: '/interview-prep/',
	},
);
