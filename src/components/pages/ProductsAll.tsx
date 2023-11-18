import axios from 'axios';
import { useEffect, useState } from 'react';
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
import PageHeader from '../PageHeader';
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

export default function ProductsAll() {
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [searchProduct, setSearchProduct] = useState('' as string);

  const getAllProducts = () => {
    axios.get('http://localhost/jed-inventory/product.php').then((res) => {
      console.log(res.data, 'prorduct');
      setProduct(res.data);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <PageHeader
        title="All Products"
        display="false"
        description="  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi voluptas eveniet deserunt expedita consequatur eaque recusandae architecto dolorem id numquam."
      />
      <div className="mt-[2rem]">
        <div className="flex justify-end">
          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search product.."
            className="w-[20rem] border-pink-500 border-2 mb-2"
          />
        </div>
        <Table className="border-2">
          <TableHeader className="bg-pink-500 text-white">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Date Expiration</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Stocks</TableHead>
              <TableHead className="text-white w-[5rem]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product
              .filter((prod) => prod.product_name.includes(searchProduct))
              .map((prod, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      className="w-[5rem] rounded-lg h-[5rem] object-cover"
                      src={prod.product_image}
                      alt={prod.product_name}
                    />
                  </TableCell>
                  <TableCell>{prod.product_name}</TableCell>
                  <TableCell>{prod.expiration_date}</TableCell>
                  <TableCell>
                    {prod.stocks > 20 ? 'IN STOCK' : 'OUT OF STOCK'}
                  </TableCell>
                  <TableCell>{prod.stocks}</TableCell>
                  <TableCell className="flex gap-2 w-[20rem] border-2">
                    <Button className="bg-pink-500">Delete</Button>
                    <Button className="bg-pink-500">Update</Button>
                    <Button className="bg-pink-500">Add stocks</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
