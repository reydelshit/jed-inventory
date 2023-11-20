import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './components/ui/input';
import PageHeader from './components/PageHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
} from 'react-icons/tb';
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

type SupplierDetails = {
  supplier_name: string;
  phone: string;
  product_supplied: string;
  address: string;
};

function App() {
  const [reports, setReports] = useState<ReportDetails[]>([]);
  const [product, setProduct] = useState<ProductDetails[]>([]);

  const [suppliers, setSuppliers] = useState<SupplierDetails[]>([]);
  const [searchProduct, setSearchProduct] = useState('' as string);

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

  const getAllSuppliers = () => {
    axios.get('http://localhost/jed-inventory/supplier.php').then((res) => {
      console.log(res.data);
      setSuppliers(res.data);
    });
  };

  useEffect(() => {
    getReports();
    getAllProducts();
    getAllSuppliers();
  }, []);

  return (
    <div className="p-4 ">
      <PageHeader title="Dashboard" display="true" description="" />

      <div className="mt-[5rem] flex flex-col">
        <div className="flex gap-2 mb-[2rem]">
          <Card className="text-start bg-white w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                NUMBER OF PRODUCTS
              </CardTitle>
              <TbHexagonNumber1 className="w-[3rem] h-[3rem] text-[#618264]" />
            </CardHeader>
            <CardContent>
              <div className="text-8xl font-bold text-[#618264]">
                {product.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total number of products
              </p>
            </CardContent>
          </Card>

          <Card className="text-start bg-white w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                NUMBER OF SUPPLIERS
              </CardTitle>
              <TbHexagonNumber2 className="w-[3rem] h-[3rem] text-[#618264]" />
            </CardHeader>
            <CardContent>
              <div className="text-8xl font-bold text-[#618264]">
                {suppliers.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total number of Suppliers
              </p>
            </CardContent>
          </Card>

          <Card className="text-start bg-white w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                RACKS AVAILABLE
              </CardTitle>
              <TbHexagonNumber3 className="w-[3rem] h-[3rem] text-[#618264]" />
            </CardHeader>
            <CardContent>
              <div className="text-8xl font-bold text-[#618264]">9</div>
              <p className="text-xs text-muted-foreground">
                Total number of products
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold uppercase">Overview of products</h1>

          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            className="self-end mb-2 w-[20rem] border-[#618264] border-2"
            placeholder="Search product.."
          />
        </div>

        <Table className="border-2">
          <TableHeader className="bg-[#618264] text-white">
            <TableRow>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Supplier</TableHead>

              <TableHead className="text-white">Date Expiration</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product
              .filter((prod) => prod.product_name.includes(searchProduct))
              .map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.supplier_name}</TableCell>
                  <TableCell>
                    {' '}
                    {moment(product.expiration_date).format('LL')}
                  </TableCell>
                  <TableCell className="font-bold text-red-500">
                    {(product.stocks /
                      reports
                        .filter(
                          (prod) =>
                            prod.type === 'Stock In' &&
                            prod.product_id === product.product_id,
                        )
                        .reduce((total, prod) => total + prod.quantity, 0)) *
                      100 <
                    10
                      ? 'Low Stock'
                      : 'In Stock'}
                  </TableCell>

                  <TableCell>
                    {product.stocks} /{' '}
                    {reports
                      .filter(
                        (prod) =>
                          prod.type === 'Stock In' &&
                          prod.product_id === product.product_id,
                      )
                      .reduce((total, prod) => total + prod.quantity, 0)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
