import { useNavigate } from 'react-router-dom';
import PageHeader from '../PageHeader';
import { Button } from '../ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';

type ReportDetails = {
  type: string;
  quantity: number;
  product_name: string;
  product_id: number;
};

type ProductDetails = {
  product_name: string;
  description: string;
  stocks: number;
  expiration_date: string;
  product_image: string;
  supplier_id: number;
  product_id: number;
  supplier_name: string;
};

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportDetails[]>([]);
  const [product, setProduct] = useState<ProductDetails[]>([]);

  const getReports = () => {
    axios.get('http://localhost/jed-inventory/reports.php').then((res) => {
      console.log(res.data);
      setReports(res.data);
    });
  };

  const getAllProducts = () => {
    axios.get('http://localhost/jed-inventory/product.php').then((res) => {
      console.log(res.data, 'prorduct');
      setProduct(res.data);
    });
  };

  useEffect(() => {
    getReports();
    getAllProducts();
  }, []);

  const CalculatePercentage = (product_id: number) => {
    return (
      ((reports
        .filter(
          (prod) => prod.type === 'Stock In' && prod.product_id === product_id,
        )
        .reduce((total, prod) => total + prod.quantity, 0) -
        reports
          .filter(
            (prod) =>
              prod.type === 'Stock Out' && prod.product_id === product_id,
          )
          .reduce((total, prod) => total + prod.quantity, 0)) /
        reports
          .filter(
            (prod) =>
              prod.type === 'Stock In' && prod.product_id === product_id,
          )
          .reduce((total, prod) => total + prod.quantity, 0)) *
      100
    );
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        display="false"
        description="Reports are calculated using this formula: (Remaining Inventory / Total Inventory) * 100"
      />

      <div className="mt-[5rem] flex justify-between w-full">
        {product
          .map((product, index) => {
            return (
              <div
                key={index}
                className="flex justify-center w-[20rem] flex-col p-4 leading-8"
              >
                <h1 className="text-9xl text-[#618264] font-bold">
                  {Math.floor(CalculatePercentage(product.product_id))}%
                </h1>

                <p className="font-bold text-3xl flex">
                  {product.stocks} /{' '}
                  {reports
                    .filter(
                      (prod) =>
                        prod.type === 'Stock In' &&
                        prod.product_id === product.product_id,
                    )
                    .reduce((total, prod) => total + prod.quantity, 0)}{' '}
                  <p className="font-normal text-sm self-end ml-2 text-[#618264]">
                    stocks
                  </p>
                </p>
                <p className="font-bold text-3xl">
                  {product.product_name.slice(0, 1).toUpperCase() +
                    product.product_name.slice(1).toLowerCase()}
                </p>
                <p className="text-1xl mb-[2rem] bg-[#618264] text-white w-fit p-1 my-2 rounded-lg font-semibold">
                  Supplier: {product.supplier_name}
                </p>

                <p className="font-bold text-1xl border-b-4 border-[#618264]">
                  {moment(product.expiration_date).endOf('day').fromNow()} until
                  consignment
                </p>
              </div>
            );
          })
          .slice(0, 4)}
      </div>

      <div className="text-end w-full mt-[2rem] px-4">
        <Button
          onClick={() => navigate('/reports/all')}
          className="bg-[#618264]"
        >
          Show more
        </Button>
      </div>
    </div>
  );
}
