import PageHeader from '../PageHeader';
import dumy from '@/assets/dumy.png';
import Rainbow from '@/assets/RAINBOW.jpg';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SupplierDetails = {
  supplier_name: string;
  phone: string;
  product_supplied: string;
  address: string;
  supplier_id: number;
};

export default function Product() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState({});
  const [suppliers, setSuppliers] = useState<SupplierDetails[]>([]);
  const [supplierID, setSupplierID] = useState<number>(0);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductDetails((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('dsadas');
    e.preventDefault();
    axios
      .post('http://localhost/jed-inventory/supplier.php', {
        ...productDetails,
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
    <div className="p-4 relative">
      <div className="flex gap-10">
        <div className="w-[80%]">
          <PageHeader
            title="Product Info"
            display="false"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et cum eveniet ut saepe commodi, incidunt voluptas nostrum? Quasi, cupiditate!"
          />

          {isMouseOver && (
            <div className="flex gap-2 w-full border-2 mt-[2rem] p-2 border-pink-500 rounded-md font-bold ">
              <img
                className="h-[15rem] w-[20rem] object-cover block rounded-md"
                src={Rainbow}
                alt=""
              />
              <div className="flex items-start flex-col justify-center text-lg">
                <h1 className="font-bold">CARROTS</h1>
                <p className="text-red-500 ">SOLD OUT</p>
                <span className="flex gap-2">
                  SUPPLIER: <p className="text-red-500"> CLASSIX SNACKS</p>
                </span>
                <p>P49.00</p>
                <span className="flex gap-2">
                  CONSINGMENT EXP DATE:{' '}
                  <p className="text-red-500"> 11/11/11</p>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex gap-2 mb-2 w-full items-end justify-end">
            <Button
              onClick={() => setShowProductModal(true)}
              className="bg-pink-500"
            >
              Add Product
            </Button>
            <Button className="bg-pink-500">Add Product</Button>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>
            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>

            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>
          </div>
          <div className="w-full text-center mt-[2rem]">
            <Button className="bg-pink-500">View More</Button>
          </div>
        </div>
      </div>

      {showProductModal && (
        <div className="absolute w-full h-full top-0 z-40 bg-white bg-opacity-80 flex justify-center items-center">
          <form
            className="bg-white w-[35rem] p-4 rounded-md border-pink-500 border-2"
            onSubmit={handleSubmit}
          >
            <Label>Supplier</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => {
                  return (
                    <SelectItem
                      onClick={() => setSupplierID(supplier.supplier_id)}
                      value={supplier.supplier_name}
                    >
                      {supplier.supplier_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div>
              <Label>Product Image</Label>
              <Input
                type="file"
                onChange={handleInputChange}
                name="product_image"
              />
            </div>
            <div>
              <Label>Product Name</Label>
              <Input onChange={handleInputChange} name="product_name" />
            </div>

            <div>
              <Label>Description</Label>
              <Input onChange={handleInputChange} name="description" />
            </div>

            <div>
              <Label>Stocks</Label>
              <Input onChange={handleInputChange} name="stocks" />
            </div>

            <div>
              <Label>Expiration</Label>
              <Input
                type="date"
                onChange={handleInputChange}
                name="expiration_date"
              />
            </div>

            <div className="gap-2 flex">
              <Button
                onClick={() => setShowProductModal(false)}
                className="mt-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="mt-2">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
