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
        type: 'Stock In',
      })
      .then((res) => {
        console.log(res.data);
        setShowStockFormStockIn(false);
        getAllStockHistory();
      });
  };

  const handleStockOut = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost/jed-inventory/stock.php', {
        product_name: selectedProduct,
        quantity: quantity,
        type: 'Stock Out',
      })
      .then((res) => {
        console.log(res.data);
        setShowStockFormStockOut(false);
        getAllStockHistory();
      });
  };

  return (
    <div className="relative">
      <PageHeader
        title="Stock"
        display="false"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptas eveniet deserunt expedita consequatur eaque recusandae architecto dolorem id numquam."
      />

      <div className="flex gap-[5rem] justify-between">
        <div className="w-[30rem]">
          <div className="mt-[2rem] w-full flex justify-end">
            <Input
              placeholder="search product"
              className="w-[15rem] border-2 border-pink-500"
            />
          </div>
          <Table className="h-full w-full mt-[2rem]">
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
                            className="bg-pink-500"
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
                            className="bg-pink-500"
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

        <div className="w-[80%]">
          <h1 className="font-bold text-3xl py-5 text-end">
            STOCK IN AND STOCK OUT HISTORY
          </h1>
          <Table className="border-2">
            <TableHeader className="bg-pink-500 text-white">
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
                  <TableCell>{stock.created_at}</TableCell>
                  <TableCell>{stock.product_name}</TableCell>
                  <TableCell>{stock.type}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                className="bg-pink-500"
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-pink-500">
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
                className="bg-pink-500"
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-pink-500">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
