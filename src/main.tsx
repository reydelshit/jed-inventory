import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './components/root/Root.tsx';
import Product from './components/pages/Product.tsx';
import Supplier from './components/pages/Supplier.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/product',
        element: <Product />,
      },

      {
        path: '/supplier',
        element: <Supplier />,
      },

      {
        path: '/stock',
        element: <h1>stock</h1>,
      },
      {
        path: '/reports',
        element: <h1>reports</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
