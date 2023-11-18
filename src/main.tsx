import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './components/root/Root.tsx';
import Product from './components/pages/Product.tsx';
import Supplier from './components/pages/Supplier.tsx';
import ProductsAll from './components/pages/ProductsAll.tsx';
import Stock from './components/pages/Stock.tsx';

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
