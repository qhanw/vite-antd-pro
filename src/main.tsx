import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PageLoading } from '@ant-design/pro-components';
import { routes } from '../config/routes';

import 'antd/dist/reset.css';
import 'virtual:uno.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<PageLoading />} />
  </React.StrictMode>,
);
