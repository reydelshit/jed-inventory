import axios from 'axios';
import PageHeader from '../PageHeader';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import moment from 'moment';

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

type StockHistory = {
  stock_history_id: number;
  product_name: string;
  type: string;
  quantity: number;
  created_at: string;
};

export default function Stock() {
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [showStockFormStockIn, setShowStockFormStockIn] = useState(false);
  const [showStockFormStockOut, setShowStockFormStockOut] = useState(false);

  const [searchProduct, setSearchProduct] = useState('' as string);
  const [selectedProduct, setSelectedProduct] = useState('' as string);
  const [selectedProductId, setSelectedProductId] = useState(0 as number);
  const [stockHistory, setStockHistory] = useState<StockHistory[]>([]);
  const [quantity, setQuantity] = useState(0 as number);
  const getAllProducts = () => {
    axios.get('http://localhost/jed-inventory/product.php').then((res) => {
      console.log(res.data, 'prorduct');
      setProduct(res.data);
    });
  };

  const getAllStockHistory = () => {
    axios.get('http://localhost/jed-inventory/stock.php').then((res) => {
      console.log(res.data, 'prorduct');
      setStockHistory(res.data);
    });
  };

  useEffect(() => {
    getAllProducts();
    getAllStockHistory();
  }, []);

  const handleOpenFormStockIn = (name: string, id: number) => {
    setShowStockFormStockIn(true);
    setSelectedProduct(name);
    setSelectedProductId(id);
  };

  const handleOpenFormStockOut = (name: string, id: number) => {
    setShowStockFormStockOut(true);
    setSelectedProduct(name);
    setSelectedProductId(id);
  };

  const handleStockIn = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost/jed-inventory/stock.php', {
        product_name: selectedProduct,
        quantity: quantity,
        product_id: selectedProductId,
        type: 'Stock In',
      })
      .then((res) => {
        console.log(res.data);
        setShowStockFormStockIn(false);
        getAllStockHistory();
        getAllProducts();
      });
  };

  const handleStockOut = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost/jed-inventory/stock.php', {
        product_name: selectedProduct,
        quantity: quantity,
        product_id: selectedProductId,
        type: 'Stock Out',
      })
      .then((res) => {
        console.log(res.data);
        setShowStockFormStockOut(false);
        getAllStockHistory();
        getAllProducts();
      });
  };

  const handleExportStock = () => {
    const printContents = document.getElementById('stock-table')?.innerHTML;
    const originalContents = document.body.innerHTML;

    const printWindow = window.open('', '_blank');

    if (printWindow) {
      if (printContents && typeof printContents === 'string') {
        printWindow.document.body.innerHTML = printContents;
      }

      printWindow.print();
      printWindow.close();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <div className="relative">
      <PageHeader
        title="Stock"
        display="false"
        description="Welcome, your central hub providing a comprehensive inventory listing. This intuitive interface facilitates easy monitoring, updating, and management of stock levels, ensuring seamless control and visibility over inventory quantities for efficient operations"
      />

      <div className="flex gap-[5rem] justify-between">
        <div className="w-[30rem]">
          <div className="mt-[2rem] w-full flex justify-end">
            <Input
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="search product"
              className="w-[15rem] border-2 border-[#618264] bg-white"
            />
          </div>

          <Table className="h-full w-full mt-[2rem] bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stocks</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product &&
                product
                  .filter((prod) => prod.product_name.includes(searchProduct))
                  .map((prod, index) => {
                    return (
                      <TableRow key={index} className="cursor-pointer">
                        <TableCell>{prod.product_name}</TableCell>

                        <TableCell>{prod.stocks}</TableCell>
                        <TableCell>{prod.supplier_name}</TableCell>

                        <TableCell className="flex gap-2">
                          <Button
                            className="bg-[#618264]"
                            onClick={() =>
                              handleOpenFormStockIn(
                                prod.product_name,
                                prod.product_id,
                              )
                            }
                          >
                            Stock In
                          </Button>

                          <Button
                            className="bg-[#618264]"
                            onClick={() =>
                              handleOpenFormStockOut(
                                prod.product_name,
                                prod.product_id,
                              )
                            }
                          >
                            Stock Out
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>

        <div className="w-[80%] ">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl py-5">
              STOCK IN AND STOCK OUT HISTORY
            </h1>
            <Button onClick={handleExportStock} className="bg-[#618264]">
              Export Report
            </Button>
          </div>
          <div id="stock-table">
            <Table className="border-2 bg-white">
              <TableHeader className="bg-[#618264] text-white">
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Product Name</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                  <TableHead className="text-white">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockHistory.map((stock, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {' '}
                      {moment(stock.created_at).format('LL')}
                    </TableCell>
                    <TableCell>{stock.product_name}</TableCell>
                    <TableCell>{stock.type}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {showStockFormStockIn && (
        <div className="absolute w-full h-full z-50 flex justify-center items-center top-0 bg-white bg-opacity-60">
          <form
            onSubmit={handleStockIn}
            className="w-[25rem] bg-white border-2 p-4 rounded-md"
          >
            <h1 className="font-bold text-center">STOCK IN</h1>

            <div>
              <Label>Product Name</Label>
              <Input value={selectedProduct} disabled />
            </div>

            <div>
              <Label>Stock In</Label>
              <Input
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-2 w-full mt-[2rem]">
              <Button
                onClick={() => setShowStockFormStockIn(false)}
                className="bg-[#618264]"
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-[#618264]">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}

      {showStockFormStockOut && (
        <div className="absolute w-full h-full z-50 flex justify-center items-center top-0 bg-white bg-opacity-60">
          <form
            onSubmit={handleStockOut}
            className="w-[25rem] bg-white border-2 p-4 rounded-md"
          >
            <h1 className="font-bold text-center">STOCK OUT</h1>

            <div>
              <Label>Product Name</Label>
              <Input value={selectedProduct} disabled />
            </div>

            <div>
              <Label>Stock Out</Label>
              <Input
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-2 w-full mt-[2rem]">
              <Button
                onClick={() => setShowStockFormStockOut(false)}
                className="bg-[#618264]"
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-[#618264]">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
