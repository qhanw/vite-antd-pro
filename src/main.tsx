import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
