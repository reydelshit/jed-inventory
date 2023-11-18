import { useNavigate } from 'react-router-dom';
import PageHeader from '../PageHeader';
import { Button } from '../ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

      <div className="border-2 mt-[5rem] flex justify-between w-full">
        {product
          .map((product, index) => {
            return (
              <div
                key={index}
                className="flex justify-center w-[20rem] border-2 flex-col p-4 leading-8"
              >
                <h1 className="text-9xl text-pink-500 font-bold mb-[2rem]">
                  {Math.floor(CalculatePercentage(product.product_id))}%
                </h1>
                <p className="font-bold text-3xl">{product.product_name}</p>
                <p className="font-bold text-1xl mb-[2rem]">
                  Supplier: Reydel Ocon
                </p>

                <p className="font-bold text-1xl">MANILA TUPI</p>
              </div>
            );
          })
          .slice(0, 4)}
      </div>

      <div className="text-end w-full mt-[2rem] px-4">
        <Button
          onClick={() => navigate('/reports/all')}
          className="bg-pink-500"
        >
          Show more
        </Button>
      </div>
    </div>
  );
}
