import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from '../config/routes';

import 'antd/dist/reset.css';
import 'virtual:uno.css';

const router = createBrowserRouter(routes, {
  // future: {
  //   v7_relativeSplatPath: true,
  //   v7_startTransition: true,
  //   v7_fetcherPersist: true,
  //   v7_normalizeFormMethod: true,
  //   v7_partialHydration: true,
  //   v7_skipActionErrorRevalidation: true,
  // },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
