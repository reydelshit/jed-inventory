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
import { useNavigate, useNavigation } from 'react-router-dom';
import moment from 'moment';

type SupplierDetails = {
  supplier_name: string;
  phone: string;
  product_supplied: string;
  address: string;
  supplier_id: number;
};

type ProductDetails = {
  product_name: string;
  description: string;
  stocks: number;
  expiration_date: string;
  product_image: string;
  supplier_id: number;
  product_id: number;
  racks: string;
};

type ProductDetailSpecific = {
  product_name: string;
  description: string;
  stocks: number;
  expiration_date: string;
  product_image: string;
  supplier_id: number;
  product_id: number;
  supplier_name: string;
  racks: string;
};

type ReportDetails = {
  type: string;
  quantity: number;
  product_name: string;
  product_id: number;
};

export default function Product() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState({});
  const [suppliers, setSuppliers] = useState<SupplierDetails[]>([]);
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [supplierID, setSupplierID] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [productID, setProductID] = useState<number>(0);
  const [productSpecific, setProductSpecific] = useState<
    ProductDetailSpecific[]
  >([]);
  const [racks, setRacks] = useState('');
  const [reports, setReports] = useState<ReportDetails[]>([]);

  const navigate = useNavigate();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());

        // console.log(base64.toString());
      }
    };
  };

  const handleMouseOver = (id: number) => {
    setIsMouseOver(true);

    console.log(id);
    // setProductID(id);
    getSpecificProduct(id);
    getReports();
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
      .post('http://localhost/jed-inventory/product.php', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...productDetails,
        product_image: image,
        supplier_id: supplierID,
        racks: racks,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === 'success') {
          setShowProductModal(false);
          getAllProducts();
        }
      });
  };

  const getAllSuppliers = () => {
    axios.get('http://localhost/jed-inventory/supplier.php').then((res) => {
      console.log(res.data, 'supplier');
      setSuppliers(res.data);
    });
  };

  const getAllProducts = () => {
    axios.get('http://localhost/jed-inventory/product.php').then((res) => {
      console.log(res.data, 'prorduct');
      setProduct(res.data);
    });
  };

  const getSpecificProduct = (id: number) => {
    axios
      .get('http://localhost/jed-inventory/product.php', {
        params: {
          product_id: id,
        },
      })
      .then((res) => {
        setProductSpecific(res.data);
        console.log(res.data, 'spe prorduct');
      });
  };

  const getReports = () => {
    axios.get('http://localhost/jed-inventory/reports.php').then((res) => {
      console.log(res.data);
      setReports(res.data);
    });
  };

  useEffect(() => {
    getAllSuppliers();
    getAllProducts();
  }, []);

  const handleStatus = (event: string) => {
    const selectedValue = event;
    const filterNumber = selectedValue.match(/\d+/g);
    const parsedSupplierID = filterNumber ? parseInt(filterNumber[0], 10) : 0;
    setSupplierID(parsedSupplierID);
  };

  const handleRacks = (event: string) => {
    const selectedValue = event;

    setRacks(selectedValue);
  };
  return (
    <div className="p-4 relative">
      <div className="flex gap-10 ">
        <div className="w-[80%]">
          <PageHeader
            title="Product Info"
            display="false"
            description="Welcome, your centralized hub displaying a comprehensive list of available products, their current stock levels, and essential details for streamlined inventory management."
          />

          {isMouseOver &&
            productSpecific.map((prod, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-4 w-full border-2 mt-[2rem] p-2 rounded-md bg-[#618264] h-[25rem] text-white"
                >
                  <img
                    className="h-full w-[20rem] object-cover block rounded-md"
                    src={prod.product_image}
                    alt=""
                  />
                  <div className="flex items-start flex-col justify-center text-lg">
                    <h1 className="font-bold text-3xl">
                      {prod.product_name.slice(0, 1).toUpperCase() +
                        prod.product_name.slice(1).toLowerCase()}
                    </h1>
                    <p className="flex">
                      {prod.stocks} /{' '}
                      {reports
                        .filter(
                          (product) =>
                            product.type === 'Stock In' &&
                            product.product_id === prod.product_id,
                        )
                        .reduce(
                          (total, product) => total + product.quantity,
                          0,
                        )}
                      <p className="text-sm self-end ml-2">stocks</p>
                    </p>
                    <span className="flex gap-2">
                      Supplier: <p> {prod.supplier_name}</p>
                    </span>
                    <span className="flex gap-2">
                      Racks: <p> {prod.racks}</p>
                    </span>
                    <p className="font-bold text-1xl border-b-4 border-[#618264]">
                      {moment(prod.expiration_date).endOf('day').fromNow()}{' '}
                      until consignment
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="w-full">
          <div className="flex gap-2 mb-2 w-full items-end justify-end">
            <Button
              onClick={() => setShowProductModal(true)}
              className="bg-[#618264]"
            >
              Add Product
            </Button>
            <Button onClick={() => navigate('/stock')} className="bg-[#618264]">
              Add Stock
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {product
              .map((product, index) => {
                return (
                  <div key={index} className="h-[20rem] p-4 ">
                    <img
                      className="h-[80%] w-full object-cover rounded-3xl cursor-pointer hover:opacity-50"
                      src={product.product_image}
                      onMouseOver={() => handleMouseOver(product.product_id)}
                      onMouseLeave={() => handleMouseLeave()}
                      alt="product"
                    />
                    <div className="p-2">
                      <h1 className="font-bold uppercase text-2xl ">
                        {product.product_name}
                      </h1>
                      <p className="text-sm">{product.stocks} stocks</p>
                    </div>
                  </div>
                );
              })
              .slice(0, 4)}
          </div>
          <div className="w-full text-center mt-[2rem]">
            <Button
              onClick={() => navigate('/product/all')}
              className="bg-[#618264]"
            >
              View More
            </Button>
          </div>
        </div>
      </div>

      {showProductModal && (
        <div className="absolute w-full h-full top-0 z-50 bg-[#f2f2f0] bg-opacity-80 flex justify-center items-center">
          <form
            className="bg-white w-[35rem] h-fit p-4 rounded-md border-[#618264] border-2"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <Label>Supplier</Label>
              <Select required onValueChange={(e: string) => handleStatus(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={supplier.supplier_name + supplier.supplier_id}
                      >
                        {supplier.supplier_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2">
              <img
                className="w-[40rem]  h-[25rem] object-cover rounded-lg mb-4"
                src={image! ? image! : dumy}
              />
              <Label>Product Image</Label>
              <Input
                required
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                name="product_image"
              />
            </div>
            <div>
              <Label>Product Name</Label>
              <Input
                required
                onChange={handleInputChange}
                name="product_name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input required onChange={handleInputChange} name="description" />
            </div>

            <div>
              <Label>Starting Stocks</Label>
              <Input required onChange={handleInputChange} name="stocks" />
            </div>

            <div className="my-2">
              <Label>Racks</Label>

              <Select required onValueChange={(e: string) => handleRacks(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i).map((num) => {
                    return (
                      <SelectItem key={num} value={num.toString()}>
                        {num + 1}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Expiration</Label>
              <Input
                required
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
