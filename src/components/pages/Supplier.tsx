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
  supplier_id: number;
};

export default function Supplier() {
  const [supplierDetails, setSupplierDetails] = useState({});
  const [suppliers, setSuppliers] = useState<SupplierDetails[]>([]);
  const [searchSupplier, setSearchSupplier] = useState('' as string);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [supplierID, setSupplierID] = useState(0 as number);

  const [updateSupplierDetails, setUpdateSupplierDetails] = useState({
    supplier_name: '',
    phone: '',
    product_supplied: '',
    address: '',
  } as SupplierDetails);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateSupplierDetails((values) => ({ ...values, [name]: value }));
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

  const deleteSupplier = (supplier_id: number) => {
    axios
      .delete(`http://localhost/jed-inventory/supplier.php`, {
        data: { supplier_id },
      })
      .then((res) => {
        console.log(res.data);
        getAllSuppliers();
      });
  };
  const handleUpdateForm = (supplier_id: number) => {
    setShowUpdateForm(true);
    setSupplierID(supplier_id);

    console.log(supplier_id);

    axios
      .get('http://localhost/jed-inventory/supplier.php', {
        params: {
          supplier_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdateSupplierDetails(res.data[0]);
      });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    console.log(supplierID);
    e.preventDefault();
    axios
      .put('http://localhost/jed-inventory/supplier.php', {
        supplier_id: supplierID,
        supplier_name: updateSupplierDetails.supplier_name,
        phone: updateSupplierDetails.phone,
        product_supplied: updateSupplierDetails.product_supplied,
        address: updateSupplierDetails.address,
      })
      .then((res) => {
        console.log(res.data);
        getAllSuppliers();
        setShowUpdateForm(false);
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
          description="Welcome, your central platform displaying a comprehensive list of current suppliers. The interface allows you to effortlessly add, update, or remove supplier details, ensuring seamless supplier management"
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

              <Button type="submit" className="mt-2 bg-[#618264]">
                Submit
              </Button>
            </form>
          </div>

          <div className="w-[60%] ">
            <div className="mt-[2rem] w-full flex justify-end my-2">
              <Input
                onChange={(e) => setSearchSupplier(e.target.value)}
                placeholder="search supplier"
                className="w-[20rem] border-2 border-[#618264] bg-white"
              />
            </div>
            <div>
              <Table className="border-2 bg-white">
                <TableHeader className="bg-[#618264] text-white">
                  <TableRow>
                    <TableHead className="text-white">Supplier</TableHead>
                    <TableHead className="text-white">
                      Product Supplied
                    </TableHead>
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
                          <TableCell>
                            <Button
                              className="bg-[#618264]"
                              onClick={() =>
                                deleteSupplier(supplier.supplier_id)
                              }
                            >
                              Delete
                            </Button>{' '}
                            <Button
                              className="bg-[#618264]"
                              onClick={() =>
                                handleUpdateForm(supplier.supplier_id)
                              }
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {showUpdateForm && (
        <div className="absolute top-0 bg-[#f2f2f0] bg-opacity-75 w-full h-full flex justify-center items-center">
          <form
            onSubmit={handleUpdateProduct}
            className="w-[30rem] border-2 p-4 bg-white rounded-lg"
          >
            <div>
              <Label>Supplier Name</Label>
              <Input
                defaultValue={updateSupplierDetails.supplier_name}
                onChange={handleInputChange}
                name="supplier_name"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                defaultValue={updateSupplierDetails.phone}
                onChange={handleInputChange}
                name="phone"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                defaultValue={updateSupplierDetails.address}
                onChange={handleInputChange}
                name="address"
              />
            </div>

            <div>
              <Label>Products Supplied</Label>
              <Input
                defaultValue={updateSupplierDetails.product_supplied}
                onChange={handleInputChange}
                name="product_supplied"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUpdateForm(false)}
                type="submit"
                className="mt-2 bg-[#618264]"
              >
                Cancel
              </Button>

              <Button type="submit" className="mt-2 bg-[#618264]">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
