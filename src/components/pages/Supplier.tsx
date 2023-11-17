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
    <div className="border-2 p-4">
      <div>
        <PageHeader
          title="Supplier"
          display="false"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et cum eveniet ut saepe commodi, incidunt voluptas nostrum? Quasi, cupiditate!"
        />
      </div>
      <div className="mt-[2rem]">
        <div className="flex w-full justify-between gap-10">
          <div className="w-[40rem] border-2 p-2">
            <h1 className="font-bold text-2xl">Supplier Info</h1>
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

              <Button type="submit" className="mt-2">
                Submit
              </Button>
            </form>
          </div>

          <div className="w-full">
            <Table className="border-2">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Product Supplied</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => {
                  return (
                    <TableRow>
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
