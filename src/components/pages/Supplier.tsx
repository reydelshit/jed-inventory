import PageHeader from '../PageHeader';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

import axios from 'axios';

type SupplierDetails = {
  supplier_name: string;
  phone: string;
  product_supplied: string;
  address: string;
};
export default function Supplier() {
  const [supplierDetails, setSupplierDetails] = useState({});
  const [suppliers, setSuppliers] = useState<SupplierDetails[]>([]);
  const [searchSupplier, setSearchSupplier] = useState('' as string);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSupplierDetails((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('dsadas');
    e.preventDefault();
    axios
      .post('http://localhost/jed-inventory/supplier.php', {
        ...supplierDetails,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const getAllSuppliers = () => {
    axios.get('http://localhost/jed-inventory/supplier.php').then((res) => {
      console.log(res.data);
      setSuppliers(res.data);
    });
  };

  useEffect(() => {
    getAllSuppliers();
  }, []);

  return (
    <div className=" p-4">
      <div>
        <PageHeader
          title="Supplier"
          display="false"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et cum eveniet ut saepe commodi, incidunt voluptas nostrum? Quasi, cupiditate!"
        />
      </div>
      <div className="mt-[2rem]">
        <div className="flex w-full justify-between gap-10">
          <div className="w-[40rem] p-4 bg-white rounded-lg">
            <form onSubmit={handleSubmit}>
              <div>
                <Label>Supplier Name</Label>
                <Input onChange={handleInputChange} name="supplier_name" />
              </div>

              <div>
                <Label>Phone</Label>
                <Input onChange={handleInputChange} name="phone" />
              </div>

              <div>
                <Label>Product Supplied</Label>
                <Input onChange={handleInputChange} name="product_supplied" />
              </div>

              <div>
                <Label>Address</Label>
                <Input onChange={handleInputChange} name="address" />
              </div>

              <Button type="submit" className="mt-2 bg-pink-500">
                Submit
              </Button>
            </form>
          </div>

          <div className="w-full">
            <div className="mt-[2rem] w-full flex justify-end my-2">
              <Input
                onChange={(e) => setSearchSupplier(e.target.value)}
                placeholder="search supplier"
                className="w-[20rem] border-2 border-pink-500 bg-white"
              />
            </div>
            <Table className="border-2 bg-white">
              <TableHeader className="bg-pink-500 text-white">
                <TableRow>
                  <TableHead className="text-white">Supplier</TableHead>
                  <TableHead className="text-white">Product Supplied</TableHead>
                  <TableHead className="text-white">Address</TableHead>
                  <TableHead className="text-white">Phone</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers
                  .filter((supplier) =>
                    supplier.supplier_name.includes(searchSupplier),
                  )
                  .map((supplier, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{supplier.supplier_name}</TableCell>
                        <TableCell>{supplier.product_supplied}</TableCell>
                        <TableCell>{supplier.address}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell>delete update</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
