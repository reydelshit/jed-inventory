import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './components/root/Root.tsx';
import Product from './components/pages/Product.tsx';
import Supplier from './components/pages/Supplier.tsx';
import ProductsAll from './components/pages/ProductsAll.tsx';
import Stock from './components/pages/Stock.tsx';
import Reports from './components/pages/Reports.tsx';
import ReportsAll from './components/pages/ReportsAll.tsx';
import Racks from './components/pages/Racks.tsx';
import Login from './components/Login.tsx';

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
        path: '/product/all',
        element: <ProductsAll />,
      },

      {
        path: '/supplier',
        element: <Supplier />,
      },

      {
        path: '/stock',
        element: <Stock />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/reports/all',
        element: <ReportsAll />,
      },

      {
        path: '/racks',
        element: <Racks />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
